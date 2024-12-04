import Axios from 'axios'


// Function to get the CSRF token from the cookies
function getCookie(name: string): string {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        const token =  parts.pop()!.split(';').shift()!;
        return decodeURIComponent(token);
    }
    return '';
}

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Set the CSRF token from the cookie in the X-XSRF-TOKEN header
axios.defaults.headers.common['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');

export default axios