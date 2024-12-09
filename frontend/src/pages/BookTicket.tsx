import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie, Show, getMovie, getShowInfo } from "../hooks/movie";
import { useLoading } from "../context/PageLoadingContext";
import LoaderSpinner from '../components/loaders/LoadingSpinner';
import MovieSlot from "../components/Movie/MovieSlot";
import MovieBooking from "../components/Movie/MovieBooking";

const BookTicket = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState<Movie | undefined>();
    const [showInfo, setShowInfo] = useState<Show | undefined>();
    const { setLoadingState } = useLoading();

    useEffect(() => {
        if (movieId) {
            // Fetch movie data from API
            getMovie(movieId).then((data) => {
                // Set movie data to state
                setMovieData(data as Movie);
            });
        }
    }, []);

    const selectShow = (showId: number) => {
        setLoadingState(true);
        getShowInfo(showId)
            .then(data => setShowInfo(data))
            .catch(error => console.log(error))
            .finally(()=>{
                setLoadingState(false);
            })
    }


    return (
        <>
            <div className="page-content-header">
                <p className="page-content-header-title">Book Movie Ticket</p>
                <p>Movie ID: {movieId}</p>
            </div>

            <div className="movie-slots-container">
                <div className="movie-slots-header">Available Shows</div>
                {movieData?.shows?.length ? (
                    <div className="book-ticket-shows-wrapper">
                        <div className="book-ticket-shows-container">
                            {movieData.shows.map((slot, i) => <MovieSlot key={i} slot={slot} clickAction={selectShow} />)}
                        </div>
                    </div>
                ) : movieData?.id ? (
                    <div className="shows-not-available">
                        Sorry but no show available for this movie.
                    </div>
                ) : <LoaderSpinner />}
            </div>

            <div className="booking-section">
                {movieData?.id ? <MovieBooking movie={movieData} show={showInfo} /> : <LoaderSpinner />}
            </div>
        </>
    );
};

export default BookTicket;
