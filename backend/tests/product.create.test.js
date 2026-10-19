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

describe('POST /api/products', () => {
  beforeEach(() => {
    productService.createProduct.mockReset();
    productService.createProduct.mockImplementation(async (data) => ({
      id: 'uuid',
      ...data,
      price: Number(data.price).toFixed(2),
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  });

  it('debe retornar 400 si faltan campos obligatorios o el precio es inválido', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ price: -5, categoryId: 1000 });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual(expect.any(String));
    expect(res.body.error).toEqual(expect.any(String));
    expect(productService.createProduct).not.toHaveBeenCalled();
  });

  it('debe retornar 201 y crear el producto enviando todos los campos (opcionales incluidos)', async () => {
    const body = {
      name: 'Teclado mecánico',
      description: 'Switches red, layout ES',
      price: 49.9,
      stock: 10,
      imageUrl: 'https://example.com/teclado.png',
      categoryId: 1000,
      brand: 'Keychron',
    };

    const res = await request(app).post('/api/products').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Producto creado con éxito',
      data: { ...body, id: 'uuid', price: '49.90', createdAt: timestamp, updatedAt: timestamp },
    });
    expect(productService.createProduct).toHaveBeenCalledWith(body);
  });

  it('debe retornar 201 y aplicar el stock por defecto (0) si solo se envían los campos requeridos', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Mouse', price: 0, categoryId: 1000 });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stock).toBe(0);
    expect(productService.createProduct).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Mouse', price: 0, categoryId: 1000, stock: 0 })
    );
  });

  it('debe retornar 400 si la categoría no existe', async () => {
    productService.createProduct.mockRejectedValue(Object.assign(new Error('FK'), { code: 'P2003' }));

    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Mouse', price: 10, categoryId: 9999 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Categoría inexistente');
  });
});
