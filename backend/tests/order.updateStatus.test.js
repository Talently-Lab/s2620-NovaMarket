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

const ORDER_ID = '7a1e2d3c-4b5f-4a6e-8d9c-0f1e2a3b4c5d';
const MISSING_ORDER_ID = '9c8b7a6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d';

const httpError = (statusCode, code, message) => Object.assign(new Error(message), { statusCode, code });

describe('PUT /api/orders/:id/status', () => {
  beforeEach(() => {
    mockRole = 'ADMIN';
    orderService.updateOrderStatus.mockReset();
  });

  it('debe actualizar el estado si el usuario es ADMIN', async () => {
    orderService.updateOrderStatus.mockResolvedValue({ id: ORDER_ID, status: 'CANCELLED' });

    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`).send({ status: 'CANCELLED' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({ id: ORDER_ID, status: 'CANCELLED' });
    expect(orderService.updateOrderStatus).toHaveBeenCalledWith(ORDER_ID, 'CANCELLED');
  });

  it('debe retornar 403 si el usuario no es ADMIN', async () => {
    mockRole = 'CLIENTE';

    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`).send({ status: 'CANCELLED' });

    expect(res.status).toBe(403);
    expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si el status no es válido', async () => {
    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`).send({ status: 'ENVIADO' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('VALIDATION_ERROR');
    expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si no se envía body', async () => {
    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('VALIDATION_ERROR');
    expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si el id no es un UUID válido', async () => {
    const res = await request(app).put('/api/orders/no-es-uuid/status').send({ status: 'CONFIRMED' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_ID');
    expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
  });

  it('debe retornar 404 si la orden no existe', async () => {
    orderService.updateOrderStatus.mockRejectedValue(httpError(404, 'ORDER_NOT_FOUND', 'Orden no encontrada'));

    const res = await request(app).put(`/api/orders/${MISSING_ORDER_ID}/status`).send({ status: 'CONFIRMED' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('ORDER_NOT_FOUND');
  });

  it('debe retornar 409 si la orden ya está cancelada', async () => {
    orderService.updateOrderStatus.mockRejectedValue(
      httpError(409, 'ORDER_CANCELLED', 'La orden ya está cancelada y no puede modificarse')
    );

    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`).send({ status: 'CONFIRMED' });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('ORDER_CANCELLED');
  });

  it('debe retornar 500 si falla el servicio', async () => {
    orderService.updateOrderStatus.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).put(`/api/orders/${ORDER_ID}/status`).send({ status: 'CONFIRMED' });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
