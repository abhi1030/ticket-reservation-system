import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie, getMovie, updateMovie } from "../hooks/movie";
import { useLoading } from "../context/PageLoadingContext";
import LoaderSpinner from '../components/loaders/LoadingSpinner';
import MovieEditor from "../components/Movie/MovieEditor";

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

    const handleSave = (movie: Movie) : Promise<Movie> => {
        return new Promise((resolve, reject) => {
            setLoadingState(true);
            // Save movie data to API
            updateMovie(movie as Movie).then((data) => {
                // Set movie data to state
                setMovieData(data as Movie);
                console.log("Movie updated successfully");
                alert("Movie updated successfully");
                resolve(data as Movie);
            }).catch((error) => {
                console.log(error);
                alert("Error updating movie")
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
                <p>Movie ID: {movieId}</p>
            </div>

            <div className="edit-movie-container">
                {movieData ? <MovieEditor movie={movieData} handleSave={handleSave} /> : <LoaderSpinner />}
            </div>
        </>
    );
};

export default EditMovie;