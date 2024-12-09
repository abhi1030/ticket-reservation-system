<?php

namespace App\Http\Controllers;

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
}
