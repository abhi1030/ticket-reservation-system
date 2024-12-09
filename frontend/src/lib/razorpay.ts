import axios from '../lib/axios';
import { User } from '../context/AuthContext';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

const makePayment = (user: User, orderId: string, amount: number, currency: string): Promise<any> => {

    // Make the payment using Razorpay API
    return new Promise((resolve, reject) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: amount,
            currency: currency,
            order_id: orderId,
            name: "Movie Ticketing System",
            description: "Order Payment for the Movie Ticketing System",
            image: "/logo192.png", // Replace with your logo URL
            handler: async (response: RazorpayResponse) => {
                // Send the payment response to your backend for ve
                console.log(response);
                await axios.post('/api/shows/verify-payment', {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    })
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(reject);
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: "9999999999",
            },
            notes: {
                address: "Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        }

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
        razorpay.on('payment.failed', (response: any) => {
            reject(response);
        });
    });
};

export default makePayment;