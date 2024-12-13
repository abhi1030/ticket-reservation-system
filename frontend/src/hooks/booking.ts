import axios from '../lib/axios';

interface Movie {
    id: number;
    name: string;
    overview: string;
    poster: string;
}

interface Show {
    id: number;
    movie_id: number;
    date: string;
    slot: string;
    ticket_price: number;
    movie: Movie;
}

interface Ticket {
    id: number;
    user_id: number;
    show_id: number;
    seat_no: number;
    status: string;
    show: Show;
}

export interface BookingInfo {
    id: string;
    user_id: string;
    payment_method: string;
    amount: number;
    currency: string;
    order_id: string;
    status: string;
    created_at: string;
    updated_at: string;
    tickets: Ticket[];
}

export interface SalesPerformance {
    total_revenue: number;
    revenue_this_week: number;
    revenue_last_7days: {
        date: string,
        revenue: number
    }[];
    total_tickets: number;
    tickets_this_week: number;
    tickets_last_7days: {
        date: string;
        tickets: number;
    }[];
}

const getBookingInfo = (bookingId: string): Promise<BookingInfo> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/bookings/' + bookingId)
            .then(response => {
                const booking = response.data.booking;
                resolve(booking);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const getMyBookings = (): Promise<BookingInfo[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/bookings')
            .then(response => {
                const bookings = response.data.bookings;
                resolve(bookings);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const getUpcomingBookings = (): Promise<BookingInfo[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/upcoming-bookings')
            .then(response => {
                const bookings = response.data.bookings;
                resolve(bookings);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const getPerformanceData = (): Promise<SalesPerformance> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/sales-performance-data')
            .then(response => {
                const performanceData = response.data;
                resolve(performanceData);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export {
    getBookingInfo,
    getMyBookings,
    getUpcomingBookings,
    getPerformanceData
};