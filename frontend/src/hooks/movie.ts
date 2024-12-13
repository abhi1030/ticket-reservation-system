import axios from '../lib/axios';

export interface Ticket {
    id: number;
    user_id: number;
    payment_id: number;
    show_id: number;
    seat_no: number;
    status: string;
}

export interface Show {
    id: number;
    movie_id: number;
    date: string;
    slot: string;
    ticket_price: number;
    total_seats: number;
    available_seats: number;
    tickets?: Ticket[];
}

export interface Movie {
    id?: number;
    name: string;
    release_date: string;
    poster: string;
    overview: string;
    genre: string;
    language: string;
    shows?: Show[];
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

const createShows = (movieId: number, ticketPrice: string, startDate: string, endDate: string): Promise<Show[]> => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/movies/${movieId}/create-shows`, { ticket_price: ticketPrice, start_date: startDate, end_date: endDate }).then((res) => {
            resolve(res.data.shows as Show[]);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const getShowInfo = (showId: number): Promise<Show> => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/shows/${showId}`).then((res) => {
            resolve(res.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
}

const getLatestMovies =  (): Promise<Movie[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/latest-movies').then((res) => {
            resolve(res.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
};

const getRecomendations = (): Promise<Movie[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/recomendations').then((res) => {
            resolve(res.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) reject(void 0);
            reject(error);
        });
    });
}

export { 
    listMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    createShows,
    getShowInfo,
    getLatestMovies,
    getRecomendations
};