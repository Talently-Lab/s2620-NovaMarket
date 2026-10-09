import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);


export const authService = {
    login: async credentials => {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    },

    register: async userData => {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    },

    getMe: async () => {
        const response = await axiosInstance.get('/me');
        return response.data;
    }
}