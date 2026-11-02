import { api } from './api';

export const productService = {
  // GET /api/products
  getProducts: async (category = 'Todos') => {
    const response = await api.get('/products');
    const products = response.data?.data || response.data || [];

    if (!category || category === 'Todos') {
      return products;
    }

    const normalize = (str = '') =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return products.filter(
      (product) => normalize(product.category) === normalize(category)
    );
  },

  // GET /api/products/:id
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data?.data || response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const response = await api.get('/products');
        const products = response.data?.data || response.data || [];
        const product = products.find((p) => p.id === id);
        if (product) return product;
      }
      throw new Error('Producto no encontrado');
    }
  },

  // POST /api/products
  createProduct: async (productData) => {
    const payload = {
      name: productData.name.trim(),
      category: productData.category,
      price: Number(productData.price),
      stock: Number(productData.stock ?? 0),
      description: productData.description?.trim() || '',
      imageUrl: productData.imageUrl?.trim() || '',
    };

    const response = await api.post('/products', payload);
    return response.data?.data || response.data;
  },

  // PUT /api/products/:id
  updateProduct: async (id, productData) => {
    const payload = {
      name: productData.name.trim(),
      category: productData.category,
      price: Number(productData.price),
      stock: Number(productData.stock ?? 0),
      description: productData.description?.trim() || '',
      imageUrl: productData.imageUrl?.trim() || '',
    };

    const response = await api.put(`/products/${id}`, payload);
    return response.data?.data || response.data;
  },

  // DELETE /api/products/:id
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data?.data || response.data;
  },
};