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
    console.warn("⚠️ Simulando petición: El endpoint /checkout aún no existe en el backend.");
    
    return new Promise((resolve) => {
      // Simulamos que internet tarda 1.5 segundos en responder
      setTimeout(() => {
        // Devolvemos exactamente la estructura "Response 201" de tu contrato
        resolve({
          id: `NM-${Math.floor(10000 + Math.random() * 90000)}`,
          userId: orderPayload.userId || "user_mock",
          totalAmount: orderPayload.total,
          status: "CONFIRMED",
          createdAt: new Date().toISOString(),
          items: orderPayload.items
        });
      }, 1500); 
    });
  },
};