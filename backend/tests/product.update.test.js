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
const existing = {
  id: 'uuid',
  name: 'Teclado mecánico',
  description: null,
  price: 49.9,
  stock: 10,
  imageUrl: null,
  categoryId: 1000,
  brand: null,
};

describe('PUT /api/products/:id', () => {
  beforeEach(() => {
    productService.updateProduct.mockReset();
    productService.updateProduct.mockImplementation(async (id, data) => {
      const merged = { ...existing, ...Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) };
      return { ...merged, id, price: Number(merged.price).toFixed(2), createdAt: timestamp, updatedAt: timestamp };
    });
  });

  it('debe retornar 400 si el precio es inválido o el name está vacío', async () => {
    const res = await request(app)
      .put('/api/products/uuid')
      .send({ name: '  ', price: 10.555 });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('name no puede estar vacío');
    expect(res.body.error).toContain('price debe ser un número >= 0 con máximo 2 decimales');
    expect(productService.updateProduct).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si el stock no es un entero >= 0', async () => {
    const res = await request(app).put('/api/products/uuid').send({ stock: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('stock debe ser un entero >= 0');
    expect(productService.updateProduct).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si el body está vacío', async () => {
    const res = await request(app).put('/api/products/uuid').send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('debe enviar al menos un campo para actualizar');
    expect(productService.updateProduct).not.toHaveBeenCalled();
  });

  it('debe retornar 200 actualizando solo un campo', async () => {
    const res = await request(app).put('/api/products/uuid').send({ price: 59.9 });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Producto actualizado con éxito',
      data: { id: 'uuid', name: 'Teclado mecánico', price: '59.90' },
    });
    expect(productService.updateProduct).toHaveBeenCalledWith('uuid', expect.objectContaining({ price: 59.9 }));
  });

  it('no debe pasar al servicio campos no permitidos', async () => {
    const res = await request(app)
      .put('/api/products/uuid')
      .send({ name: 'Mouse', id: 'otro-id', createdAt: '2000-01-01T00:00:00.000Z' });

    expect(res.status).toBe(200);
    const [, data] = productService.updateProduct.mock.calls[0];
    expect(data).not.toHaveProperty('id');
    expect(data).not.toHaveProperty('createdAt');
    expect(data.name).toBe('Mouse');
  });
});
