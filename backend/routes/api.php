<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowController;

// protected Routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logoutUser']);
    
    Route::apiResource('/movies', MovieController::class);

    Route::get('/movies/{movie}/shows', [ShowController::class, 'getShows']);
    Route::post('/movies/{movie}/create-shows', [ShowController::class, 'createShows']);
    Route::get('/shows/{showId}', [ShowController::class, 'getShowInfo']);
    Route::post('/shows/book-tickets', [ShowController::class, 'bookTickets']);
    Route::post('/shows/verify-payment', [ShowController::class, 'verifyPayment']);

    Route::get('/bookings', [ShowController::class, 'getMyBookings']);
    Route::get('/bookings/{paymentId}', [ShowController::class, 'getBookingInfo']);

    // Route::get('movies/{movie}/tickets', [TicketController::class, 'index']);
    // Route::post('movies/{movie}/tickets/reserve', [TicketController::class, 'reserve']);
    // Route::post('movies/{movie}/tickets/cancel', [TicketController::class, 'cancel']);
});

// Public Routes
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);
Route::get('/latest-movies', [MovieController::class, 'latestMovies']);