import './moviesList.css';

import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { listMovies, Movie } from "../../../hooks/movie";
import MovieCard from "../MovieCard";
import LoadingSpinner from "../../loaders/LoadingSpinner";

const MoviesList = () => {
    const [moviesList , setMoviesList] = useState<Movie[]>([]);

    useEffect(() => {
        listMovies().then(data => {
            setMoviesList(data as Movie[]);
        });
    }, [])

    return (
        <>
            <div className="page-content-header">
                <p className="page-content-header-title">Movies List</p>
                <div className="page-content-header-actions">
                    <NavLink to="/movies/create" className="add-movie-button">Add Movie</NavLink>
                </div>
            </div>

            {/* Render movie names */}
            <div className="movies-list">
                {moviesList.length ? moviesList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                )) :  <LoadingSpinner />}
            </div>
        </>
    );
}

export default MoviesList;