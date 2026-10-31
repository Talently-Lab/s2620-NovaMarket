const request = require('supertest');

let mockRole = 'ADMIN';

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/order.service', () => ({
  createOrder: jest.fn(),
  getOrdersByUser: jest.fn(),
  getAllOrders: jest.fn(),
  getOrderById: jest.fn(),
  cancelOrder: jest.fn(),
  updateOrderStatus: jest.fn(),
}));
jest.mock('../src/middlewares/auth.middleware', () => {
  const { authorize } = jest.requireActual('../src/middlewares/auth.middleware');
  return {
    authenticate: (req, res, next) => {
      req.user = { id: 'user-uuid', role: mockRole };
      next();
    },
    authorize,
  };
});

const app = require('../app');
const orderService = require('../src/services/order.service');

describe('GET /api/orders', () => {
  beforeEach(() => {
    mockRole = 'ADMIN';
    orderService.getAllOrders.mockReset();
  });

  it('debe retornar todos los pedidos si el usuario es ADMIN', async () => {
    orderService.getAllOrders.mockResolvedValue([
      { id: 'order-1', userId: 'user-a', status: 'CONFIRMED', totalAmount: '59.98', items: [] },
      { id: 'order-2', userId: 'user-b', status: 'CANCELLED', totalAmount: '10.00', items: [] },
    ]);

    const res = await request(app).get('/api/orders');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(orderService.getAllOrders).toHaveBeenCalled();
  });

  it('debe retornar 403 si el usuario no es ADMIN', async () => {
    mockRole = 'CLIENTE';

    const res = await request(app).get('/api/orders');

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(orderService.getAllOrders).not.toHaveBeenCalled();
  });

  it('debe retornar 500 si falla el servicio', async () => {
    orderService.getAllOrders.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/orders');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
