const request = require('supertest');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/product.service', () => ({
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));
jest.mock('../src/middlewares/auth.middleware', () => ({
  authenticate: (req, res, next) => next(),
  authorize: () => (req, res, next) => next(),
}));

const app = require('../app');
const productService = require('../src/services/product.service');

const timestamp = '2026-10-16T00:00:00.000Z';

const products = [
  { id: 'uuid-1', name: 'Teclado', price: '49.90', stock: 10, categoryId: 1000, category: { id: 1000, name: 'Periféricos' }, createdAt: timestamp, updatedAt: timestamp },
  { id: 'uuid-2', name: 'Monitor', price: '199.00', stock: 3, categoryId: 1001, category: { id: 1001, name: 'Pantallas' }, createdAt: timestamp, updatedAt: timestamp },
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
    expect(productService.getAllProducts).toHaveBeenCalledWith(undefined);
  });

  it('debe pasar el filtro de categoría al servicio', async () => {
    productService.getAllProducts.mockResolvedValue([products[0]]);

    const res = await request(app).get('/api/products').query({ category: 'Periféricos' });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([products[0]]);
    expect(productService.getAllProducts).toHaveBeenCalledWith('Periféricos');
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
    expect(res.body).toEqual({ success: false, message: 'Error al obtener productos', error: 'DB caída' });
  });
});

describe('GET /api/products/:id', () => {
  beforeEach(() => {
    productService.getProductById.mockReset();
  });

  it('debe retornar 200 con el producto si existe', async () => {
    productService.getProductById.mockResolvedValue(products[0]);

    const res = await request(app).get('/api/products/uuid-1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Producto obtenido con éxito', data: products[0] });
    expect(productService.getProductById).toHaveBeenCalledWith('uuid-1');
  });

  it('debe retornar 404 si el producto no existe', async () => {
    productService.getProductById.mockResolvedValue(null);

    const res = await request(app).get('/api/products/no-existe');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Producto no encontrado');
  });

  it('debe retornar 500 si el servicio falla', async () => {
    productService.getProductById.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/products/uuid-1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, message: 'Error al obtener producto', error: 'DB caída' });
  });
});
