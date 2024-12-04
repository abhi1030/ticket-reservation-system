import axios from '../lib/axios'
import { AxiosError } from 'axios';

const csrf = () => axios.get('/sanctum/csrf-cookie');

const login = async (email: string, password: string) => {
    await csrf();

    return new Promise((resolve, reject) => {
        axios.post('/login', { email, password })
            .then(() => {
                // get user data
                axios.get('/api/user')
                    .then(response => resolve(response.data))
                    .catch(error => {
                        const { response } = error as AxiosError;
                        if (response && response.status === 401) {
                            reject('Invalid credentials');
                        } else {
                            reject(error)
                        }
                    });
            })
            .catch(error => {
                const { response } = error as AxiosError;
                if (response && response.status === 422) {
                    reject(response.data);
                } else {
                    reject(error);
                }
            });
    });
}

const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    await csrf();

    return new Promise((resolve, reject) => {
        if (password !== confirmPassword) {
            reject('Passwords do not match');
        }
        axios.post('/register', { name, email, password, password_confirmation: confirmPassword })
            .then(() => {
                // get user data
                axios.get('/api/user')
                    .then(response => resolve(response.data))
                    .catch(error => {
                        const { response } = error as AxiosError;
                        if (response && response.status === 401) {
                            reject('Invalid credentials');
                        } else {
                            reject(error)
                        }
                    });
            }).catch(error => {
                const { response } = error as AxiosError;
                if (response && response.status === 422) {
                    reject(response.data);
                } else {
                    reject(error);
                }
            });
    });
}

const logout = async () => {
    await csrf();
    
    return new Promise(async (resolve, reject) => {
        axios.post('/logout').then(() => {
            resolve(void 0);
        }).catch(error => {
            reject(error);
        });
    });
}

export default { login, register, logout };