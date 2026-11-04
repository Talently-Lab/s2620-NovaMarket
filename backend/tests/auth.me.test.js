const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../src/config/prisma', () => ({}));
jest.mock('../src/services/auth.service', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  getProfile: jest.fn(),
}));

process.env.JWT_SECRET = 'test-secret';

const app = require('../app');
const authService = require('../src/services/auth.service');
const { signToken } = require('../src/utils/jwt');

const profile = {
  id: 'user-uuid',
  email: 'ana@example.com',
  fullName: 'Ana Pérez',
  role: 'CLIENTE',
  createdAt: '2026-10-16T00:00:00.000Z',
};

const validToken = () => signToken({ id: 'user-uuid', email: profile.email, role: 'CLIENTE' });

describe('GET /api/auth/me', () => {
  beforeEach(() => {
    authService.getProfile.mockReset();
  });

  it('debe retornar 401 si no se envía token', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ success: false, message: 'Token no proporcionado' });
    expect(authService.getProfile).not.toHaveBeenCalled();
  });

  it('debe retornar 401 si el token es inválido', async () => {
    const token = jwt.sign({ id: 'user-uuid' }, 'otro-secreto');

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token inválido o expirado');
    expect(authService.getProfile).not.toHaveBeenCalled();
  });

  it('debe retornar 401 si el token está expirado', async () => {
    const token = jwt.sign({ id: 'user-uuid' }, process.env.JWT_SECRET, { expiresIn: -10 });

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(authService.getProfile).not.toHaveBeenCalled();
  });

  it('debe retornar 200 con el perfil del usuario autenticado', async () => {
    authService.getProfile.mockResolvedValue(profile);

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${validToken()}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Perfil obtenido con éxito', data: profile });
    expect(authService.getProfile).toHaveBeenCalledWith('user-uuid');
  });

  it('debe retornar 403 si el usuario está inactivo', async () => {
    const error = new Error('Usuario inactivo');
    error.statusCode = 403;
    authService.getProfile.mockRejectedValue(error);

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${validToken()}`);

    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ success: false, message: 'Usuario inactivo' });
  });

  it('debe retornar 500 con mensaje genérico si falla el servicio', async () => {
    authService.getProfile.mockRejectedValue(new Error('DB caída'));

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${validToken()}`);

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false, message: 'Error al obtener el perfil' });
  });
});
