const request = require('supertest');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/auth.service', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

const app = require('../app');
const authService = require('../src/services/auth.service');

const timestamp = '2026-10-16T00:00:00.000Z';

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    authService.registerUser.mockReset();
    authService.registerUser.mockImplementation(async ({ email, fullName }) => ({
      user: { id: 'uuid', email, fullName, role: 'CUSTOMER', createdAt: timestamp },
      token: 'jwt-token',
    }));
  });

  it('debe retornar 400 si faltan campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'ana@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual(expect.any(String));
    expect(res.body.error).toEqual(expect.any(String));
    expect(authService.registerUser).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si el email es inválido y la contraseña es corta', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'no-es-email', password: '123', fullName: 'Ana Pérez' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Formato de email inválido');
    expect(res.body.error).toContain('al menos 8 caracteres');
    expect(authService.registerUser).not.toHaveBeenCalled();
  });

  it('debe retornar 201 y registrar el usuario con datos válidos', async () => {
    const body = { email: 'ana@example.com', password: 'secreta123', fullName: 'Ana Pérez' };

    const res = await request(app).post('/api/auth/register').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Usuario registrado con éxito',
      data: {
        user: { id: 'uuid', email: body.email, fullName: body.fullName, createdAt: timestamp },
        token: 'jwt-token',
      },
    });
    expect(authService.registerUser).toHaveBeenCalledWith(body);
  });

  it('debe retornar 409 si el email ya está registrado', async () => {
    authService.registerUser.mockImplementation(async () => {
      const error = new Error('El email ya está registrado');
      error.statusCode = 409;
      throw error;
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'ana@example.com', password: 'secreta123', fullName: 'Ana Pérez' });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });
});
