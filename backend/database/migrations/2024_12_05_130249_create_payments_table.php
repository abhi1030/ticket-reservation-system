<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('payment_method')->nullable(); // e.g., Razorpay, Stripe, etc.
            $table->integer('amount'); // Amount paid
            $table->string('currency'); // Amount paid
            $table->string('order_id')->unique(); // Unique order ID
            $table->string('transaction_id')->unique()->nullable(); // Unique payment transaction ID from the payment gateway
            $table->string('signature')->unique()->nullable(); // Payment description
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending'); // Payment status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
