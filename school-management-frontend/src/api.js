import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/', // adjust if your backend uses a different port
});

// const token = localStorage.getItem('token');
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};


export default API;
