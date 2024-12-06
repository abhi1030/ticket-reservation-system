<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MovieController;

// protected Routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logoutUser']);
    
    Route::apiResource('movies', MovieController::class);
    Route::get('movies/{movie}/shows', [MovieController::class, 'getShows']);
    Route::post('movies/{movie}/create-shows', [MovieController::class, 'createShows']);
    // Route::get('movies/{movie}/tickets', [TicketController::class, 'index']);
    // Route::post('movies/{movie}/tickets/reserve', [TicketController::class, 'reserve']);
    // Route::post('movies/{movie}/tickets/cancel', [TicketController::class, 'cancel']);
});

// Public Routes
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);
