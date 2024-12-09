import './singleBooking.css';

import { Boxes, CircleDollarSign, BookA, BadgeCheck, BadgeInfo, BadgeX, Clapperboard, CalendarDays, Clock } from 'lucide-react';
import { BookingInfo } from '../../../hooks/booking';

interface SingleBookingProps {
    bookingInfo: BookingInfo;
}

const SingleBooking: React.FC<SingleBookingProps> = ({ bookingInfo }) => {
    const bookingDate = new Date(bookingInfo.updated_at);

    return (
        <div className="booking-container">
            <div className="booking-header">
                <h1>Booking Details</h1>
                <span>{bookingDate.toDateString()}</span>
            </div>

            <div className="payment-details" >
                <div className="payment-info">
                    <h2>Payment Details</h2>
                    <div className="payment-info-item">
                        <Boxes color="#00BCD4" />
                        <span>{bookingInfo.payment_method}</span>
                    </div>
                    <div className="payment-info-item">
                        <BookA color="#2196F3" />
                        <span>Booking ID : <strong>{bookingInfo.order_id}</strong></span>
                    </div>
                    <div className="payment-info-item">
                        <CircleDollarSign color="#FF9800" />
                        <span>Payment amount : <strong>₹ {bookingInfo.amount}</strong></span>
                    </div>
                    {bookingInfo.status === 'completed' ? (
                        <div className="payment-info-item">
                            <BadgeCheck color="#4CAF50" />
                            <span>Status : <strong>{bookingInfo.status}</strong></span>
                        </div>
                    ) : bookingInfo.status === 'pending' ? (
                        <div className="payment-info-item">
                            <BadgeInfo color="#FFC107" />
                            <span>Status : <strong>{bookingInfo.status}</strong></span>
                        </div>
                    ) : (
                        <div className="payment-info-item">
                            <BadgeX color="#F44336" />
                            <span>Status : <strong>{bookingInfo.status}</strong></span>
                        </div>
                    )}
                </div>

                <div className="show-info">
                    <h2>Show Details</h2>
                    <div className="show-info-item">
                        <Clapperboard color="#4CAF50" />
                        <span>{bookingInfo.tickets[0].show.movie.name}</span>
                    </div>
                    <div className="show-info-item">
                        <CalendarDays color="#2196F3" />
                        <span>{bookingInfo.tickets[0].show.date}</span>
                    </div>
                    <div className="show-info-item">
                        <Clock color="#FFC107" />
                        <span>{bookingInfo.tickets[0].show.slot}</span>
                    </div>
                </div>

                <div className="ticket-selection">
                    <h2>Tickets Booked</h2>
                    {bookingInfo.tickets.map((ticket, index) => (
                        <div className="ticket-type">
                            <div className="ticket-info">
                                <h3>{ticket.show.movie.name}</h3>
                                <p>Seat No : {ticket.seat_no}</p>
                                <span className="ticket-price">Ticket Price : ₹ {ticket.show.ticket_price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleBooking;