<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_SUCCESS ='completed';
    const STATUS_FAILED = 'failed';

    protected $fillable = [
        'user_id',
        'payment_method',
        'amount',
        'currency',
        'order_id',
        'transaction_id',
        'signature',
        'status',
    ];

    // A payment belongs to a ticket
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
