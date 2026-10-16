import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

const axiosInstance = axios.create({
  baseURL: API_URL
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

export const productService = {

  getProducts: async (category = 'Todos') => {
    const response = await axiosInstance.get('/');
    const products = response.data.data || [];

    if (!category || category === 'Todos') {
      return products;
    }

    const normalize = (str = '') =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return products.filter(
      (product) => normalize(product.category) === normalize(category)
    );
  },


  getProductById: async (id) => {
    const response = await axiosInstance.get('/');
    const products = response.data.data || [];
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  },


  createProduct: async (productData) => {
    const payload = {
      name: productData.name.trim(),
      category: productData.category,
      price: Number(productData.price),
      stock: Number(productData.stock ?? 0),
      description: productData.description?.trim() || '',
      imageUrl: productData.imageUrl?.trim() || ''
    };

    const response = await axiosInstance.post('/', payload);
    return response.data.data;
  },


  updateProduct: async (id, productData) => {
    const payload = {
      name: productData.name.trim(),
      category: productData.category,
      price: Number(productData.price),
      stock: Number(productData.stock ?? 0),
      description: productData.description?.trim() || '',
      imageUrl: productData.imageUrl?.trim() || ''
    };

    const response = await axiosInstance.put(`/${id}`, payload);
    return response.data.data;
  },


  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data.data;
  }
};