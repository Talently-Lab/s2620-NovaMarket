import { api } from './api';

export const productService = {
  // GET /api/categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data?.data || [];
  },

  // GET /api/products
  getProducts: async (category = 'Todos') => {
    const response = await api.get('/products');
    const products = response.data?.data || [];

    if (!category || category === 'Todos') {
      return products;
    }

    const normalize = (str = '') =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return products.filter((product) => {
      const catName = typeof product.category === 'object' ? product.category?.name : product.category;
      return normalize(catName) === normalize(category);
    });
  },

  // GET /api/products/:id
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data?.data;
  },

  // POST /api/products
  createProduct: async (productData) => {
    const payload = {
      name: productData.name.trim(),
      description: productData.description?.trim() || 'Sin descripción',
      price: Number(parseFloat(productData.price).toFixed(2)),
      stock: parseInt(productData.stock ?? 0, 10),
      imageUrl: productData.imageUrl?.trim() || 'https://picsum.photos/400/400',
      categoryId: parseInt(productData.categoryId, 10),
      brand: productData.brand?.trim() || 'NovaMarket',
    };

    const response = await api.post('/products', payload);
    return response.data?.data;
  },

  // PUT /api/products/:id
  updateProduct: async (id, productData) => {
    const payload = {
      name: productData.name.trim(),
      description: productData.description?.trim() || 'Sin descripción',
      price: Number(parseFloat(productData.price).toFixed(2)),
      stock: parseInt(productData.stock ?? 0, 10),
      imageUrl: productData.imageUrl?.trim() || 'https://picsum.photos/400/400',
      categoryId: parseInt(productData.categoryId, 10),
      brand: productData.brand?.trim() || 'NovaMarket',
    };

    const response = await api.put(`/products/${id}`, payload);
    return response.data?.data;
  },

  // DELETE /api/products/:id
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data?.data;
  },
};