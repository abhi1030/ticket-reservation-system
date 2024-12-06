<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Show;

class MovieController extends Controller
{
    /**
     * Display a listing of movies.
     */
    public function index()
    {
        $movies = Movie::all();
        return response()->json($movies);
    }


    /**
     * Store a newly created movie in database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'overview' => 'required|string',
            'release_date' => 'required|date',
            'poster' => 'required|string',
            'genre' => 'required|string',
            'language' => 'required|string',
        ]);

        $movie = Movie::create($request->all());

        return response()->json([
            'message' => 'Movie created successfully',
            'movie' => $movie
        ], 201);
    }

    /**
     * Display the specified movie.
     */
    public function show($id)
    {
        $movie = Movie::with('shows')->find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }

    /**
     * Update the specified movie in database.
     */
    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'overview' => 'sometimes|required|string',
            'release_date' => 'sometimes|required|date',
            'poster' => 'sometimes|required|string',
            'genre' => 'sometimes|required|string',
            'language' => 'sometimes|required|string',
        ]);

        $movie->update($request->all());

        return response()->json([
            'message' => 'Movie updated successfully',
            'movie' => $movie
        ]);
    }

    /**
     * Remove the specified movie from databse.
     */
    public function destroy($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully']);
    }

    /**
     * Create shows for the movie.
     */
    public function createShows(Request $request, $id)
    {
        $movie = Movie::find($id);

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
                    'movie_id' => $id,
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
    public function getShows($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $shows = $movie->shows;

        return response()->json($shows);
    }
}
