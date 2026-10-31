import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const orderService = {

  // POST /api/orders
  createOrder: async (orderPayload) => {
    const response = await axiosInstance.post('/orders', orderPayload);
    return response.data?.data || response.data;
  },

  // GET /api/orders/my
  getMyOrders: async () => {
    const response = await axiosInstance.get('/orders/my');
    return response.data?.data || response.data;
  },

  // PUT /api/orders/:id/camcel
  cancelOrder: async orderId => {
    const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
    return response.data?.data || response.data;
  }

}