import { useNavigate } from "react-router-dom";
import MovieEditor from "../components/Movie/MovieEditor";
import { Movie , createMovie } from "../hooks/movie";
import { useLoading } from "../context/PageLoadingContext";

const CreateMovie = () => {
    const navigate = useNavigate();
    const { setLoadingState } = useLoading();

    const movieData:Movie = {
        name: "Movie Name",
        overview: "Please enter movie overview",
        release_date: "2024-12-4",
        genre: "Action|Crime|Drama|Thriller",
        poster: "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg",
        language:"Hindi|English"
    };

    const handleSave = (movie: Movie): Promise<null> => {
        return new Promise((resolve, reject) => {
            setLoadingState(true);
            createMovie(movie).then((data) => {
                const {id} = data as Movie;
                alert('Movie created successfully');
                resolve(null);
                navigate(`/movies/${id}`);
            }).catch((error) => {
                console.log(error);
                reject(error);
            }).finally(() => {
                setLoadingState(false);
            });
        });
    };

    return (
        <>
            <div className="page-content-header">
                <p className="page-content-header-title">Add Movie</p>
            </div>

            <div className="edit-movie-container">
                <MovieEditor movie={movieData} handleSave={handleSave} />
            </div>
        </>
    )
};

export default CreateMovie;