import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
    baseUrl: `{API_URL}/orders`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const orderService = {
    createOrder: async (orderPayload) => {
        const response = await axiosInstancea.post('/', orderPayload);

        return response.data?.data || response.data;
    },
};