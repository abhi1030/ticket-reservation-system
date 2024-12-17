import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Movie, getMovie, updateMovie } from "../hooks/movie";
import { useLoading } from "../context/PageLoadingContext";
import LoaderSpinner from '../components/loaders/LoadingSpinner';
import MovieEditor from "../components/Movie/MovieEditor";
import MovieSlot from "../components/Movie/MovieSlot";
import MovieSlotAdd from "../components/Movie/MovieSlotAdd";

const EditMovie = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState<Movie | undefined>();
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

    const handleSave = (movie: Movie): Promise<Movie> => {
        return new Promise((resolve, reject) => {
            setLoadingState(true);
            // Save movie data to API
            updateMovie(movie as Movie).then((data) => {
                // Set movie data to state
                setMovieData(data as Movie);
                console.log("Movie updated successfully");
                toast.success("Movie updated successfully");
                resolve(data as Movie);
            }).catch((error) => {
                console.log(error);
                toast.error("Error updating movie")
                reject(error);
            }).finally(() => {
                setLoadingState(false);
            });
        });
    };

    return (
        <>
            <div className="page-content-header">
                <p className="page-content-header-title">Edit Movie</p>
                <div className="page-content-header-actions">
                    <NavLink to="/movies/create" className="add-movie-button">Create New Movie</NavLink>
                </div>
            </div>

            <div className="movie-slots-container">
                <div className="movie-slots-header">Available Shows</div>
                {movieData?.shows?.length ? (
                    <div className="movie-slots-inner-wrapper">
                        <div className="movie-slots-inner-container">
                            {movieData.shows.map((slot, i) => <MovieSlot key={i} slot={slot} />)}
                        </div>
                    </div>
                ) : movieData?.id ? <MovieSlotAdd movieData={movieData} setMovieData={setMovieData} /> : <LoaderSpinner />}
            </div>

            <div className="edit-movie-container">
                {movieData ? <MovieEditor movie={movieData} handleSave={handleSave} /> : <LoaderSpinner />}
            </div>
        </>
    );
};

export default EditMovie;