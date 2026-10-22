const request = require('supertest');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/order.service', () => ({
  createOrder: jest.fn(),
  getOrdersByUser: jest.fn(),
  getAllOrders: jest.fn(),
  getOrderById: jest.fn(),
  cancelOrder: jest.fn(),
  updateOrderStatus: jest.fn(),
}));
jest.mock('../src/middlewares/auth.middleware', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 'user-uuid', role: 'CLIENTE' };
    next();
  },
  authorize: () => (req, res, next) => next(),
}));

const app = require('../app');
const orderService = require('../src/services/order.service');

const items = [{ productId: 'product-uuid', quantity: 2 }];
const shippingAddress = { street: 'Av. Siempre Viva 742', city: 'Lima' };

describe('POST /api/orders', () => {
  beforeEach(() => {
    orderService.createOrder.mockReset();
  });

  it.each([
    ['items vacío', { items: [], shippingAddress }],
    ['quantity inválida', { items: [{ productId: 'product-uuid', quantity: 0 }], shippingAddress }],
    ['sin shippingAddress', { items }],
  ])('debe retornar 400 con %s', async (_, body) => {
    const res = await request(app).post('/api/orders').send(body);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(orderService.createOrder).not.toHaveBeenCalled();
  });

  it('debe crear el pedido asociado al usuario autenticado', async () => {
    orderService.createOrder.mockResolvedValue({
      id: 'order-uuid',
      userId: 'user-uuid',
      status: 'CONFIRMED',
      shippingAddress,
      totalAmount: '59.98',
      items: [{ productId: 'product-uuid', quantity: 2, unitPrice: '29.99' }],
    });

    const res = await request(app).post('/api/orders').send({ items, shippingAddress });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalAmount).toBe('59.98');
    expect(orderService.createOrder).toHaveBeenCalledWith('user-uuid', items, shippingAddress);
  });

  it('debe retornar 409 si no hay stock suficiente', async () => {
    const error = new Error('Stock insuficiente o producto no disponible: product-uuid');
    error.statusCode = 409;
    error.code = 'INSUFFICIENT_STOCK';
    orderService.createOrder.mockRejectedValue(error);

    const res = await request(app).post('/api/orders').send({ items, shippingAddress });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });
});
