import './latestMovies.css';

import { useEffect, useState } from "react";
import { getLatestMovies, Movie } from "../../../hooks/movie";
import MovieCard from "../MovieCard";
import LoadingSpinner from "../../loaders/LoadingSpinner";

const MoviesList = () => {
    const [moviesList , setMoviesList] = useState<Movie[]>([]);

    useEffect(() => {
        getLatestMovies().then(data => {
            setMoviesList(data);
        });
    }, [])

    return (
        <>
            {/* Render movie names */}
            <div className="latest-movies-list">
                {moviesList.length ? moviesList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} preview={true} />
                )) :  <LoadingSpinner />}
            </div>
        </>
    );
}

export default MoviesList;