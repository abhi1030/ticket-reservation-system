import './bookingList.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingInfo, getMyBookings } from '../../../hooks/booking';

const BookingList = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<BookingInfo[]>([]);

    const parseDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
    }

    const openBooking = (id: string) => {
        navigate(`/bookings/${id}`);
    }

    useEffect(() => {
        getMyBookings().then(data => {
            setBookings(data);
        });
    }, []);

    return (
        <div className="bookings-list">
            {bookings.map(booking => (
                <div className={`booking-card booking-state-${booking.status}`} onClick={(e) => openBooking(booking.id)}>
                    <div className="booking-card-header">
                        <h2>Booking ID : {booking.order_id}</h2>
                        <p>Booking Date : {parseDate(booking.updated_at)}</p>
                    </div>
                    <div className="booking-details">
                        <p><strong>Payment Method :</strong> {booking.payment_method}</p>
                        <p><strong>Payment Status :</strong> {booking.status}</p>
                        <p><strong>Total Amount :</strong> ₹ {booking.amount}</p>
                    </div>
                    <div className="ticket-details">
                        <h3>Ticket Details</h3>
                        <div className="ticket">
                            <p><strong>Movie :</strong> {booking.tickets[0].show.movie.name}</p>
                            <p><strong>Show Date :</strong> {booking.tickets[0].show.date} {booking.tickets[0].show.slot}</p>
                            <p><strong>Seats :</strong> {booking.tickets.map(ticket => (
                                <span key={ticket.id} className="seat">A{ticket.seat_no}</span>
                            ))}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingList;