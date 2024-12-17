import './movieBooking.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Sofa } from "lucide-react";
import { Movie, Show } from "../../../hooks/movie";
import { createPayment } from "../../../hooks/payment";
import { useAuth } from '../../../context/AuthContext';
import { useLoading } from '../../../context/PageLoadingContext';
import makePayment from '../../../lib/razorpay';

// Props for the MovieBooking component
interface MovieBookingProps {
    movie: Movie;
    show?: Show;
}

const MovieBooking: React.FC<MovieBookingProps> = ({ movie, show }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const { setLoadingState } = useLoading();

    useEffect(() => {
        setSelectedSeats([]);
    }, [show]);

    const selectSeatHandler = (seatNo: number) => {
        if (show?.tickets?.find((ticket) => {
            return ticket.seat_no === seatNo && ticket.status === 'booked'
        })) return; // Check if the seat is already booked

        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatNo)
                ? prevSelectedSeats.filter((seat) => seat !== seatNo) // Remove the seat if already selected
                : [...prevSelectedSeats, seatNo].sort((x, y) => x - y) // Add the seat if not selected
        );
    }

    const bookTicketHandler = () => {
        if (!show?.id || user == null) {
            toast.error("Please select a show");
            return;
        }

        setLoadingState(true);
        createPayment(show?.id, selectedSeats)
            .then((data) => {
                makePayment(user, data.payment.order_id, data.payment.amount, data.payment.currency)
                    .then((response) => {
                        console.log(response);
                        navigate(`/bookings/${response.payment.id}`);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(error);
                    });
            }).catch((error) => {
                console.log(error);
                toast.error(error);
            })
            .finally(() => {
                setLoadingState(false);
            });
    }

    const addClasses = (seatno: number) => {
        let classes = '';
        if (selectedSeats.includes(seatno)) classes += ' selected-seat';

        show?.tickets?.map((ticket) => {
            if (ticket.seat_no === seatno && ticket.status == 'booked') {
                if (ticket.user_id == user?.id) {
                    classes += ' my-seat';
                }
                else classes += ' booked-seat';
            }
        });

        return classes;
    }

    return (
        <div className="movie-booking-container">
            <div className="movie-booking-preview">
                <div className="movie-booking-title">{movie.name}</div>
                <img className="movie-booking-poster" src={movie.poster} alt={movie.name} />
            </div>
            <div className="movie-booking-section">
                {show ? (
                    <div className="movie-show-section">
                        <div className="movie-show-info">
                            <div className="movie-show-date">Show Date : {show.date}</div>
                            <div className="movie-show-time">Show Time : {show.slot}</div>
                            <div className="movie-show-price">Ticket Price : Rs.{show.ticket_price}</div>
                        </div>
                        <div className="movie-show-checkout">
                            <div className="movie-show-selected-seats">
                                Selected Seats : {selectedSeats.join(' | ')}
                            </div>
                            <div className="movie-show-total-price">
                                Total Price : Rs.{selectedSeats.length * show.ticket_price}
                            </div>
                            <button className="movie-show-checkout-button" onClick={bookTicketHandler}>Book Tickets</button>
                        </div>
                        <div className="movie-show-seat-container">
                            {Array.from({ length: 20 }, (__, i) => (
                                <div key={i + 1}
                                    className={`movie-show-seat${addClasses(i + 1)}`}
                                    onClick={() => selectSeatHandler(i + 1)} >
                                    <Sofa className="show-seat-icon" color="#fff" size={32} />
                                    <span>{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                ) : (
                    <div className='movie-show-unselected'>
                        Please Select a show
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieBooking;