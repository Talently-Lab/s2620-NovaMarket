import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/checkout`,
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

// Clave temporal para persistir las órdenes simuladas en el navegador
const MOCK_ORDERS_KEY = 'novamarket_mock_orders';

export const orderService = {
  createOrder: async (orderPayload) => {
    // ---------------------------------------------------------
    // TODO: Descomentar esto cuando el backend esté terminado
    // ---------------------------------------------------------
    // const response = await axiosInstance.post('', orderPayload);
    // return response.data?.data || response.data;

    // ---------------------------------------------------------
    // ⚠️ SIMULACIÓN TEMPORAL (MOCK) PARA PODER AVANZAR
    // ---------------------------------------------------------
    console.warn("⚠️ Simulando petición: El endpoint POST /checkout aún no existe en el backend.");

    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: `NM-${Math.floor(10000 + Math.random() * 90000)}`,
          customerName: orderPayload.customerName || "Usuario",
          shippingAddress: orderPayload.shippingAddress || "Dirección no especificada",
          total: orderPayload.total,
          totalAmount: orderPayload.total,
          status: "CONFIRMED",
          createdAt: new Date().toISOString(),
          items: orderPayload.items || [],
        };

        const existing = JSON.parse(localStorage.getItem(MOCK_ORDERS_KEY) || '[]');
        localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify([newOrder, ...existing]));

        resolve(newOrder);
      }, 1200);
    });
  },

  getMyOrders: async () => {
    // ---------------------------------------------------------
    // TODO: Descomentar esto cuando el backend esté terminado
    // ---------------------------------------------------------
    // const response = await axiosInstance.get('/my-orders');
    // return response.data?.data || response.data;

    // ---------------------------------------------------------
    // ⚠️ SIMULACIÓN TEMPORAL (MOCK) PARA PODER AVANZAR
    // ---------------------------------------------------------
    console.warn("⚠️ Simulando petición: El endpoint GET /checkout/my-orders aún no existe en el backend.");

    return new Promise((resolve) => {
      setTimeout(() => {
        const storedOrders = JSON.parse(localStorage.getItem(MOCK_ORDERS_KEY) || '[]');

        // Si no hay compras guardadas aún, precargamos una orden de ejemplo
        if (storedOrders.length === 0) {
          const defaultMockOrder = [
            {
              id: "NM-84920",
              customerName: "Facundo Ledesma",
              shippingAddress: "Av. Argentina 450, Neuquén Capital",
              total: 129.90,
              totalAmount: 129.90,
              status: "COMPLETED",
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // Hace 2 días
              items: [
                {
                  productId: 1,
                  name: "Teclado Mecánico RGB Switch Red",
                  price: 89.90,
                  quantity: 1,
                },
                {
                  productId: 2,
                  name: "Mousepad XL Speed Edition",
                  price: 40.00,
                  quantity: 1,
                },
              ],
            },
          ];
          localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify(defaultMockOrder));
          resolve(defaultMockOrder);
          return;
        }

        resolve(storedOrders);
      }, 800);
    });
  },
};