import axios from '../lib/axios'

export interface Movie {
    id?: number;
    name: string;
    release_date: string;
    poster: string;
    overview: string;
    genre: string;
    language: string;
}

const listMovies = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/movies').then((res) => {
            resolve(res.data as Movie);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const getMovie = (id: string) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/movies/${id}`).then((res) => {
            resolve(res.data as Movie[]);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const createMovie = (movie: Movie) => {
    return new Promise((resolve, reject) => {
        const { name, release_date, poster, overview, genre, language } = movie;
        axios.post('/api/movies', { name, release_date, poster, overview, genre, language }).then((res) => {
            resolve(res.data.movie as Movie[]);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const updateMovie = (movie: Movie) => {
    return new Promise((resolve, reject) => {
        const { name, release_date, poster, overview, genre, language } = movie;
        axios.put(`/api/movies/${movie.id}`, { name, release_date, poster, overview, genre, language }).then((res) => {
            resolve(res.data.movie as Movie[]);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const deleteMovie = (id: number) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/movies/${id}`).then((res) => {
            resolve(res.data.message as string);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

export { listMovies, getMovie, createMovie, updateMovie, deleteMovie };