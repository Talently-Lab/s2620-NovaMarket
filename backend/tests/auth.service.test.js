jest.mock('../src/config/prisma', () => ({
  user: { findUnique: jest.fn() },
}));

const prisma = require('../src/config/prisma');
const { getProfile } = require('../src/services/auth.service');

const dbUser = {
  id: 'user-uuid',
  email: 'ana@example.com',
  fullName: 'Ana Pérez',
  role: 'CLIENTE',
  notActive: false,
  createdAt: new Date('2026-10-16T00:00:00.000Z'),
};

describe('authService.getProfile', () => {
  beforeEach(() => {
    prisma.user.findUnique.mockReset();
  });

  it('debe consultar por id sin seleccionar el hash de la contraseña', async () => {
    prisma.user.findUnique.mockResolvedValue(dbUser);

    await getProfile('user-uuid');

    const args = prisma.user.findUnique.mock.calls[0][0];
    expect(args.where).toEqual({ id: 'user-uuid' });
    expect(args.select.passwordHash).toBeUndefined();
  });

  it('debe retornar el perfil sin el campo notActive', async () => {
    prisma.user.findUnique.mockResolvedValue(dbUser);

    const result = await getProfile('user-uuid');

    const { notActive, ...expected } = dbUser;
    expect(result).toEqual(expected);
  });

  it('debe lanzar 401 si el usuario no existe', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(getProfile('user-uuid')).rejects.toMatchObject({
      statusCode: 401,
      message: 'Usuario no encontrado',
    });
  });

  it('debe lanzar 403 si el usuario está inactivo', async () => {
    prisma.user.findUnique.mockResolvedValue({ ...dbUser, notActive: true });

    await expect(getProfile('user-uuid')).rejects.toMatchObject({
      statusCode: 403,
      message: 'Usuario inactivo',
    });
  });
});
