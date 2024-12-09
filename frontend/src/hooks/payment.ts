import axios from '../lib/axios';

interface CreatePaymentResponse {
    message: string;
    payment: {
        order_id: string;
        currency: string;
        amount: number;
        status: string;
    }
}

const createPayment = (showId: number, seats: number[]): Promise<CreatePaymentResponse> => {
    return new Promise((resolve, reject) => {
        axios.post('/api/shows/book-tickets', { show_id: showId, seats })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if (error.response.data.message) {
                    reject(error.response.data.message);
                }
                reject("Something went wrong. Please try again later.");
            });
    });
};

export { createPayment };