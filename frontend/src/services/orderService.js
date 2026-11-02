import { api } from './api';

export const orderService = {
  // POST /api/orders
  createOrder: async (orderPayload) => {
    const response = await api.post('/orders', orderPayload);
    return response.data?.data || response.data;
  },

  // GET /api/orders/my
  getMyOrders: async () => {
    const response = await api.get('/orders/my');
    return response.data?.data || response.data;
  },

  // PUT /api/orders/:id/cancel
  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data?.data || response.data;
  },
};