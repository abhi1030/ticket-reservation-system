
import './movieSlotAdd.css';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Movie, createShows } from '../../../hooks/movie';
import { useLoading } from '../../../context/PageLoadingContext';

// Props for the MovieCard component
interface MovieSlotAddProps {
    movieData: Movie;
    setMovieData: (movieData: Movie) => void;
}

const MovieSlotAdd: React.FC<MovieSlotAddProps> = ({ movieData, setMovieData }) => {
    const { setLoadingState } = useLoading();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');

    const addShowsHandler = () => {
        if (!movieData?.id || !startDate || !endDate || !ticketPrice) {
            toast.error('All fields are required!');
        }
        else {
            setLoadingState(true);
            createShows(movieData.id, ticketPrice, startDate, endDate)
                .then((data) => {
                    setMovieData({ ...movieData, shows: data });
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoadingState(false);
                });
        }
    }

    return (
        <div className="add-slot-container">
            <p className="add-slot-title">Add Movie Shows</p>
            <div className="add-slot-form">
                <div className="add-slot-form-item">
                    <label className="add-slot-form-label">Ticket Price</label>
                    <input className="add-slot-form-input" type="number" min="0" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
                </div>
                <div className="add-slot-form-item">
                    <label className="add-slot-form-label">Start Date</label>
                    <input className="add-slot-form-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="add-slot-form-item">
                    <label className="add-slot-form-label">End Date</label>
                    <input className="add-slot-form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button className="add-slot-btn" onClick={addShowsHandler}>Add Shows</button>
            </div>
        </div>
    );
}

export default MovieSlotAdd;