import './movieRecomendations.css';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getRecomendations, Movie } from '../../../hooks/movie';
import LoadingSpinner from '../../loaders/LoadingSpinner';

const MovieRecomendations = () => {
    const [recomendations, setRecomendations] = useState<Movie[]>();

    useEffect(() => {
        getRecomendations()
            .then(data => setRecomendations(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="recomendations-container">
            <div className="recomendations-header">Movie Recomendations</div>
            <div className="recomendations-wrapper">
                {recomendations?.map(movie => (
                    <div key={movie.id} className='recomended-movie-card'>
                        <img className="recomended-movie-bg" src={movie.poster} alt={movie.name} />
                        <div className="recomended-movie-info">
                            <div className="recomended-movie-name">{movie.name}</div>
                            <div className="recomended-movie-release-date">Release Date : {movie.release_date}</div>
                            <div className="recomended-movie-genre">Genre : {movie.genre.split('|').map(genre => (
                                <span key={genre}>{genre}</span>
                            ))}</div>
                            <div className="recomended-movie-language">Language : {movie.language.split('|').map(language => (
                                <span key={language}>{language}</span>
                            ))}</div>
                            <NavLink to={`/book-ticket/${movie.id}`} className="recomended-movie-book">Book Now</NavLink>
                        </div>
                    </div>
                ))}
                {!recomendations && (<>
                    <div className="recomended-movie-card"><LoadingSpinner /></div>
                    <div className="recomended-movie-card"><LoadingSpinner /></div>
                    <div className="recomended-movie-card"><LoadingSpinner /></div>
                    <div className="recomended-movie-card"><LoadingSpinner /></div>
                </>)}
            </div>

        </div>
    );
}

export default MovieRecomendations;