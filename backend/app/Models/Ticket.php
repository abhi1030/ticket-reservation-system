<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory;

    const STATUS_BOOKED = 'booked';
    const STATUS_CANCELED = 'canceled';
    const STATUS_PENDING = 'pending';
    
    protected $fillable = [
        'user_id',
        'show_id',
        'payment_id',
        'seat_no',
        'status',
    ];

    // A ticket belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A ticket belongs to a show
    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    // A ticket has a payment
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
