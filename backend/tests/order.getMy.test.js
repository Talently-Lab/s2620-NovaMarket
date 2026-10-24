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

describe('GET /api/orders/my', () => {
  beforeEach(() => {
    orderService.getOrdersByUser.mockReset();
  });

  it('debe retornar los pedidos del usuario autenticado con el nombre de los productos', async () => {
    orderService.getOrdersByUser.mockResolvedValue([
      {
        id: 'order-uuid',
        userId: 'user-uuid',
        status: 'CONFIRMED',
        totalAmount: '59.98',
        items: [{ productId: 'product-uuid', productName: 'Auriculares X', quantity: 2, unitPrice: '29.99' }],
      },
    ]);

    const res = await request(app).get('/api/orders/my');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].items[0].productName).toBe('Auriculares X');
    expect(orderService.getOrdersByUser).toHaveBeenCalledWith('user-uuid');
  });

  it('debe retornar un arreglo vacío si el usuario no tiene pedidos', async () => {
    orderService.getOrdersByUser.mockResolvedValue([]);

    const res = await request(app).get('/api/orders/my');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('debe retornar 500 si falla el servicio', async () => {
    orderService.getOrdersByUser.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/orders/my');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
