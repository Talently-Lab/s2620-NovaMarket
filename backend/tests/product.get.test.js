const request = require('supertest');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/product.service', () => ({
  getAllProducts: jest.fn(),
  getProductsByCategoryId: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));
jest.mock('../src/services/category.service', () => ({
  getAllCategories: jest.fn(),
  getCategoryByName: jest.fn(),
}));
jest.mock('../src/middlewares/auth.middleware', () => ({
  authenticate: (req, res, next) => next(),
  authorize: () => (req, res, next) => next(),
}));

const app = require('../app');
const productService = require('../src/services/product.service');
const categoryService = require('../src/services/category.service');

const PRODUCT_ID = '3f2c1b9a-8d4e-4f6a-9b2c-1e5d7a8c9f01';
const OTHER_PRODUCT_ID = '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e';
const timestamp = '2026-10-16T00:00:00.000Z';

const products = [
  { id: PRODUCT_ID, name: 'Teclado', price: '49.90', stock: 10, categoryId: 1000, category: { id: 1000, name: 'Periféricos' }, createdAt: timestamp, updatedAt: timestamp },
  { id: OTHER_PRODUCT_ID, name: 'Monitor', price: '199.00', stock: 3, categoryId: 1001, category: { id: 1001, name: 'Pantallas' }, createdAt: timestamp, updatedAt: timestamp },
];

describe('GET /api/products', () => {
  beforeEach(() => {
    productService.getAllProducts.mockReset();
  });

  it('debe retornar 200 con la lista de productos', async () => {
    productService.getAllProducts.mockResolvedValue(products);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Productos obtenidos con éxito', data: products });
    expect(productService.getAllProducts).toHaveBeenCalledWith();
  });

  it('debe retornar 200 con una lista vacía si no hay productos', async () => {
    productService.getAllProducts.mockResolvedValue([]);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  it('debe retornar 500 si el servicio falla', async () => {
    productService.getAllProducts.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, message: 'Error al obtener productos', error: 'INTERNAL_ERROR' });
  });
});

describe('GET /api/products/category/:categoryName', () => {
  beforeEach(() => {
    categoryService.getCategoryByName.mockReset();
    productService.getProductsByCategoryId.mockReset();
  });

  it('debe retornar 200 con los productos de la categoría', async () => {
    categoryService.getCategoryByName.mockResolvedValue({ id: 1000, name: 'Periféricos' });
    productService.getProductsByCategoryId.mockResolvedValue([products[0]]);

    const res = await request(app).get(`/api/products/category/${encodeURIComponent('Periféricos')}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Productos obtenidos con éxito', data: [products[0]] });
    expect(categoryService.getCategoryByName).toHaveBeenCalledWith('Periféricos');
    expect(productService.getProductsByCategoryId).toHaveBeenCalledWith(1000);
  });

  it('debe retornar 404 si la categoría no existe', async () => {
    categoryService.getCategoryByName.mockResolvedValue(null);

    const res = await request(app).get('/api/products/category/Inexistente');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ success: false, message: 'Categoría no encontrada', error: 'CATEGORY_NOT_FOUND' });
    expect(productService.getProductsByCategoryId).not.toHaveBeenCalled();
  });

  it('debe retornar 500 si el servicio falla', async () => {
    categoryService.getCategoryByName.mockResolvedValue({ id: 1000, name: 'Periféricos' });
    productService.getProductsByCategoryId.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/products/category/Perifericos');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, message: 'Error al obtener productos', error: 'INTERNAL_ERROR' });
  });
});

describe('GET /api/products/:id', () => {
  beforeEach(() => {
    productService.getProductById.mockReset();
  });

  it('debe retornar 200 con el producto si existe', async () => {
    productService.getProductById.mockResolvedValue(products[0]);

    const res = await request(app).get(`/api/products/${PRODUCT_ID}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Producto obtenido con éxito', data: products[0] });
    expect(productService.getProductById).toHaveBeenCalledWith(PRODUCT_ID);
  });

  it('debe retornar 404 si el producto no existe', async () => {
    productService.getProductById.mockResolvedValue(null);

    const res = await request(app).get(`/api/products/${OTHER_PRODUCT_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Producto no encontrado');
  });

  it('debe retornar 400 si el id no es un UUID válido', async () => {
    const res = await request(app).get('/api/products/no-es-uuid');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ success: false, message: 'ID inválido', error: 'INVALID_ID' });
    expect(productService.getProductById).not.toHaveBeenCalled();
  });

  it('debe retornar 500 si el servicio falla', async () => {
    productService.getProductById.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get(`/api/products/${PRODUCT_ID}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, message: 'Error al obtener producto', error: 'INTERNAL_ERROR' });
  });
});
