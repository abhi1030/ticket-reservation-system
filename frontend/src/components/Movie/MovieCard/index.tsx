import './movieCard.css';

import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { SquarePen, Trash2 } from 'lucide-react';
import { Movie, deleteMovie } from '../../../hooks/movie';
import { useLoading } from '../../../context/PageLoadingContext';
import { useAuth } from '../../../context/AuthContext';
import { hasPermission } from '../../../lib/permission';

// Props for the MovieCard component
interface MovieCardProps {
    movie: Movie;
    preview?: boolean;
    enableBookings?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, preview, enableBookings = true }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setLoadingState } = useLoading();

    const deleteMovieAction = () => {
        if (movie.id === undefined) return;

        setLoadingState(true);
        deleteMovie(movie.id)
            .then((message) => {
                console.log('message', message);
                toast.success(message as string);
                navigate(0);
            }).catch(() => {
                toast.error('Error while deleting movie');
            })
            .finally(() => {
                setLoadingState(false);
            });
    }


    return (
        <div className="movie-card">
            {!preview && hasPermission(user, ['edit movies', 'delete movies']) && (
                <div className="movie-card-actions">
                    {hasPermission(user, ['edit movies']) && (
                        <NavLink className="movie-card-action-icon" to={`/movies/${movie.id}`}>
                            <SquarePen size={18} color="#002678" />
                        </NavLink>
                    )}
                    {hasPermission(user, ['delete movies']) && (
                        <div className="movie-card-action-icon" onClick={deleteMovieAction}>
                            <Trash2 size={18} color="#c20303" />
                        </div>
                    )}

                </div>
            )}
            <img className="movie-card-poster" src={movie.poster} alt={movie.name} />
            <h2 className="movie-card-title">{movie.name}</h2>
            <p className="movie-card-release-date">Release Date : {movie.release_date}</p>
            <p className="movie-card-genre">Genre : {movie.genre.split('|').map((genre, i) => <span key={i}>{genre}</span>)}</p>
            <p className="movie-card-language">Language : {movie.language.split('|').map((language, i) => <span key={i}>{language}</span>)}</p>
            <p className="movie-card-overview">{movie.overview}</p>
            {enableBookings ? (
                <NavLink className="movie-card-button" to={`/book-ticket/${movie.id}`}>Book Ticket</NavLink>
            ) : (
                <button className="movie-card-button" disabled>Book Ticket</button>
            )}
        </div>
    )
}

export default MovieCard;