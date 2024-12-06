<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'payment_method',
        'transaction_id',
        'amount',
        'status',
    ];

    // A payment belongs to a ticket
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
