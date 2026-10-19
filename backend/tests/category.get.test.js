const request = require('supertest');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/category.service', () => ({
  getAllCategories: jest.fn(),
}));

const app = require('../app');
const categoryService = require('../src/services/category.service');

const timestamp = '2026-10-19T00:00:00.000Z';

const categories = [
  { id: 1000, name: 'Accesorios', createdAt: timestamp },
  { id: 1001, name: 'Audio', createdAt: timestamp },
];

describe('GET /api/categories', () => {
  beforeEach(() => {
    categoryService.getAllCategories.mockReset();
  });

  it('debe retornar 200 con la lista de categorías', async () => {
    categoryService.getAllCategories.mockResolvedValue(categories);

    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Categorías obtenidas con éxito', data: categories });
  });

  it('debe retornar 500 si el servicio falla', async () => {
    categoryService.getAllCategories.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, message: 'Error al obtener categorías', error: 'DB caída' });
  });
});
