<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Show extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'date',
        'slot',
        'ticket_price',
        'total_seats',
        'available_seats',
    ];

    // A show belongs to a movie
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    // A show can have multiple tickets
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
