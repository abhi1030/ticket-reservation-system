<?php

namespace App\Http\Controllers;

use DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Show;
use App\Models\Ticket;
use App\Models\Payment;
use App\Helpers\Razorpay;

class ShowController extends Controller
{
    /**
     * Create shows for the movie.
     */
    public function createShows(Request $request, $movie_id)
    {
        $movie = Movie::find($movie_id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'ticket_price' => 'required|integer',
        ]);

        $existingsShows = $movie->shows
            ->whereBetween('date', [$request->start_date , $request->end_date])
            ->count();

        if($existingsShows > 0) {
            return response()->json([
                'message' => 'Shows already exist for this date range'
            ], 400);
        }

        // Creating shows data array
        $shows_data = [];
        $show_slots = Show::AVAILABLE_SLOTS;
        $start_date = Carbon::parse($request->start_date);
        $end_date = Carbon::parse($request->end_date);

        while($start_date->lte($end_date)) {
            foreach($show_slots as $slot) {
                $shows_data[] = [
                    'movie_id' => $movie_id,
                    'date' => $start_date->format('Y-m-d'),
                    'slot' => $slot,
                    'ticket_price' => $request->ticket_price,
                    'total_seats' => Show::TOTAL_SEATS,
                    'available_seats' => Show::TOTAL_SEATS,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

            }
            $start_date->addDay();
        }

        $shows = Show::insert($shows_data);
        if (!$shows) {
            return response()->json([
                'message' => 'Error creating shows'
            ], 500);
        }

        $all_shows = $movie->shows()->get()->toArray();

        return response()->json([
            'message' => 'Shows created successfully',   
            'shows' => $all_shows
        ], 201);
    }

    /**
     * Display shows for the movie.
     */
    public function getShows($movie_id)
    {
        $movie = Movie::find($movie_id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $shows = $movie->shows;

        return response()->json($shows);
    }

    /**
     * get specified show info.
     */
    public function getShowInfo($show_id)
    {
        $show = Show::with('tickets')->find($show_id);

        if (!$show) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($show);
    }

    /**
     * book tickets for the shows.
     */
    public function bookTickets(Request $request)
    {
        $request->validate([
            'show_id' => 'required|integer',
            'seats' => 'required|array|min:1', // Ensure seats is an array and has at least one item
            'seats.*' => 'integer',
        ]);

        // get show info
        $show = Show::find($request->show_id);
        if (!$show) {
            return response()->json(['message' => 'Movie show not found'], 404); 
        }

        // check for seat availability.
        $existing_tickets = Ticket::where('show_id', $request->show_id)
            ->whereIn('seat_no', $request->seats)
            ->where('status', Ticket::STATUS_BOOKED)->count();
        if ($existing_tickets > 0) {
            return response()->json(['message' => 'Some seats are already booked'], 400);
        }

        // create payment order using razorpay.
        $payment_amount =  $show->ticket_price * count($request->seats);
        $payment_receipt = 'user_'. auth()->user()->id. '_show_'. $request->show_id. '_seats_'. implode('_', $request->seats);
        $order = Razorpay::createOrder($payment_amount, $payment_receipt);

        if ($order['status'] == 'failed') {
            return response()->json(['message' => 'Error creating payment order'], 500);
        }

        // DB transaction begin
        DB::beginTransaction();

        // create Payment entry.
        $payment = Payment::create([
            'user_id' => auth()->user()->id,
            'payment_method' => 'Razorpay',
            'amount' => $payment_amount,
            'currency' => $order['currency'],
            'order_id' => $order['id'],
        ]);
        if (!$payment) {
            return response()->json(['message' => 'Error creating payment'], 500);
        }

        // create insert data for tickets table
        $ticketsData = [];
        foreach ($request->seats as $seat) {
            $ticketsData[] = [
                'user_id' => auth()->user()->id,
                'show_id' => $request->show_id,
                'payment_id' => $payment->id,
                'seat_no' => $seat,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        // create tickets entry
        $tickets = Ticket::insert($ticketsData);
        if (!$tickets) {
            return response()->json(['message' => 'Error creating tickets'], 500);
        }

        // DB transaction commit
        DB::commit();

        return response()->json([
            'message' => 'Tickets booked successfully',
            'payment' => $payment,
        ], 201);
    }

    /**
     * Verify payment for the tickets.
     */
    public function verifyPayment(Request $request)
    {
        $request->validate([
            'payment_id' => 'required|string',
            'order_id' => 'required|string',
            'signature' => 'required|string',
        ]);

        // get payment info
        $payment = Payment::where('order_id', $request->order_id)->first();
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        // verify payment signature
        $verify = Razorpay::verifyPaymentSignature($request->payment_id, $request->order_id,  $request->signature);
        if (!$verify) {
            return response()->json(['message' => 'Payment verification failed'], 400);
        }

        // update payment status
        $payment->status = Payment::STATUS_SUCCESS;
        $payment->transaction_id = $request->payment_id;
        $payment->signature = $request->signature;
        $payment->save();

        // update ticket status
        $tickets = Ticket::where('payment_id', $payment->id)->update(['status' => Ticket::STATUS_BOOKED]);
        if (!$tickets) {
            return response()->json(['message' => 'Error updating tickets status'], 500);
        }

        // update show availability
        $show = Show::whereHas('tickets', function($query) use($payment) {
                $query->where('payment_id', $payment->id);
            })->first();

        if (!$show) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        $show->available_seats -= count($payment->tickets);
        $show->save();

        return response()->json([
            'message' => 'Payment verified successfully',
            'payment' => $payment,
        ], 200);
    }

    /**
     * Get my bookings
     */
    public function getMyBookings()
    {
        $user_id = auth()->user()->id;
        $payments = Payment::with([
            'tickets' => function($query) {
                $query->select('id','payment_id', 'user_id','show_id', 'seat_no', 'status');
            },
            'tickets.show' => function ($query) {
                $query->select('id', 'movie_id', 'date', 'slot', 'ticket_price');
            },
            'tickets.show.movie' => function ($query) {
                $query->select('id', 'name', 'overview', 'poster');
            }])
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['message' => 'My bookings', 'bookings' => $payments], 200);
    }

    /**
     * Get booking info
     */
    public function getBookingInfo($payment_id)
    {
        $booking_info = Payment::with([
            'tickets' => function($query) {
                $query->select('id','payment_id', 'user_id','show_id', 'seat_no', 'status');
            },
            'tickets.show' => function ($query) {
                $query->select('id', 'movie_id', 'date', 'slot', 'ticket_price');
            },
            'tickets.show.movie' => function ($query) {
                $query->select('id', 'name', 'overview', 'poster');
            }])->find($payment_id);

        if (!$booking_info) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json(['message' => 'Show booking info', 'booking' => $booking_info], 200);
    }
}