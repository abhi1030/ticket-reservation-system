import Axios from 'axios'

const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token ? `Bearer ${token}` : null;
}

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Adding a request interceptor to dynamically set the Authorization header
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();  // Get the token dynamically
        if (token) {
            config.headers['Authorization'] = token;  // Set the token in the request headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios