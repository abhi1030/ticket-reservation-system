import './movieSlot.css';

import { Show } from '../../../hooks/movie';

// Props for the MovieSlot component
interface MovieSlotProps {
    slot: Show;
}

const MovieSlot: React.FC<MovieSlotProps> = ({ slot }) => {
    return (
        <div className="movie-slot">
            <div className="movie-slot-date-time">
                <div className="movie-slot-date">Date : {slot.date}</div>
                <div className="movie-slot-time">Time : {slot.slot}</div>
            </div>
            <div className="movie-slot-ticket-price">Ticket Price : <span>Rs {slot.ticket_price}</span></div>
            <div className="movie-slot-seats-info">
                <div className="movie-slot-total-seats">Total Seats : {slot.total_seats}</div>
                <div className="movie-slot-available-seats">Available Seats : {slot.available_seats}</div>
            </div>
        </div>
    );
};

export default MovieSlot;