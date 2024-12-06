import './movieEditor.css';

import { useState } from 'react';
import { Movie } from '../../../hooks/movie';
import MovieCard from '../MovieCard';

// Props for the MovieCard component
interface MovieEditorProps {
    movie: Movie;
    handleSave: (movie: Movie) => Promise<Movie | null>;
}

const MovieEditor: React.FC<MovieEditorProps> = ({ movie, handleSave }) => {
    const [movieData, setMovieData] = useState(movie);

    const handleSaveAction = () => {
        handleSave(movieData).then((updatedMovie) => {
            if (updatedMovie) {
                setMovieData(updatedMovie);
            }
        });
    }

    return (
        <div className="movie-editor-container">
            <div className="movie-editor-form">
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Name</label>
                    <input className="movie-editor-item-input" type="text" value={movieData.name} onChange={(e) => setMovieData({ ...movieData, name: e.target.value })} />
                </div>
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Release Date</label>
                    <input className="movie-editor-item-input" type="text" value={movieData.release_date} onChange={(e) => setMovieData({ ...movieData, release_date: e.target.value })} />
                </div>
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Poster</label>
                    <input className="movie-editor-item-input" type="text" value={movieData.poster} onChange={(e) => setMovieData({ ...movieData, poster: e.target.value })} />
                </div>
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Genre</label>
                    <input className="movie-editor-item-input" type="text" value={movieData.genre} onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })} />
                </div>
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Language</label>
                    <input className="movie-editor-item-input" type="text" value={movieData.language} onChange={(e) => setMovieData({ ...movieData, language: e.target.value })} />
                </div>
                <div className="movie-editor-item-group">
                    <label className="movie-editor-item-label">Overview</label>
                    <textarea className="movie-editor-item-textarea" rows={5} value={movieData.overview} onChange={(e) => setMovieData({ ...movieData, overview: e.target.value })} />
                </div>
                <button className="movie-editor-item-button" onClick={handleSaveAction}>Save Changes</button>
            </div>
            <div className="movie-editor-preview">
                <MovieCard movie={movieData} preview={true} />
            </div>
        </div>
    );
}

export default MovieEditor;