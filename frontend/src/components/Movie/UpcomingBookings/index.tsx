import './upcomingBookings.css';

import { useState, useEffect } from 'react';
import { getUpcomingBookings, BookingInfo } from '../../../hooks/booking';
import LoadingSpinner from '../../loaders/LoadingSpinner';

const UpcomingBookings = () => {
    const [bookings, setBookings] = useState<BookingInfo[]>();

    useEffect(() => {
        getUpcomingBookings()
            .then(data => {
                // console.log(data)
                setBookings(data)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="upcoming-bookings-container">
            <div className="upcoming-bookings-header">Upcoming Bookings</div>
            {bookings ? bookings.length > 0 ? (
                <div className="upcoming-bookings-wrapper">
                    {bookings.map(booking => (
                        <div key={booking.id} className="upcoming-booking-card">
                            <img className="upcoming-booking-poster"
                                src={booking.tickets[0].show.movie.poster}
                                alt={booking.tickets[0].show.movie.name} />
                            < div className="upcoming-booking-info">
                                <div className="upcoming-booking-name">{booking.tickets[0].show.movie.name}</div>
                                <div className="upcoming-booking-details">
                                    <div className="upcoming-booking-date">
                                        <span>{booking.tickets[0].show.date}</span>
                                        <span>{booking.tickets[0].show.slot}</span>
                                    </div>
                                    <div className="upcoming-booking-seats">Seats : {booking.tickets.map(ticket => <span key={ticket.id}>A{ticket.seat_no}</span>)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>) : <div className="no-upcoming-bookings">No Upcoming Bookings</div> : <div className="upcoming-bookings-loader"><LoadingSpinner /></div>}
        </div>
    );
}

export default UpcomingBookings;