import axios from '../lib/axios'
import { AxiosError } from 'axios';

const login = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', { email, password })
            .then((res) => {
                // set token in local storage
                localStorage.setItem('authToken', res.data.token);

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

const register = (name: string, email: string, password: string, confirmPassword: string) => {
    return new Promise((resolve, reject) => {
        if (password !== confirmPassword) {
            reject('Passwords do not match');
        }
        else {
            axios.post('/api/register', { name, email, password, password_confirmation: confirmPassword })
                .then((res) => {
                    // set token in local storage
                    localStorage.setItem('authToken', res.data.token);

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
                    const { message, errors } = response?.data as any;
                    if(errors?.email?.length) {
                        reject(errors.email[0]);
                    }
                    else {
                        reject(message);
                    }
                });
        }
    });
}

const logout = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/logout').then(() => {
            resolve(void 0);
        }).catch(error => {
            if (error.response && error.response.status === 401) resolve(void 0);

            reject(error);
        });
    });
}

const Auth = { login, register, logout };
export default Auth