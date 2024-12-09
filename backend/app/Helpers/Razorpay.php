<?php

namespace App\Helpers;

use Razorpay\Api\Api;

class Razorpay
{
    public static function createOrder($amount, $receipt)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $order = $api->order->create([
            'amount' => $amount * 100, // amount in paise
            'currency' => 'INR',
            'receipt' => $receipt,
            'payment_capture' => 1,
        ]);

        return $order->toArray();
    }

    public static function verifyPaymentSignature($payment_id, $order_id, $signature)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $attributes = [
            'razorpay_order_id' => $order_id,
            'razorpay_payment_id' => $payment_id,
            'razorpay_signature' => $signature
        ];

        try {
            $api->utility->verifyPaymentSignature($attributes);
            return true;
        } catch (\Exception $e) {
            \Log::info('Razorpay payment signature verification failed: '. $e->getMessage());
            return false;
        }
    }
}