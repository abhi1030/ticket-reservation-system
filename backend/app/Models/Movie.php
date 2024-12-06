<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'overview',
        'release_date',
        'poster',
        'genre',
        'language',
    ];

    // A movie can have multiple shows
    public function shows()
    {
        return $this->hasMany(Show::class);
    }
}
