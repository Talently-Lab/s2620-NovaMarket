const prisma = require('../config/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');

const registerUser = async ({ email, password, fullName }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('El email ya está registrado');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, fullName },
    select: { id: true, email: true, fullName: true, role: true, createdAt: true },
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
};

// Mismo error para email inexistente y contraseña incorrecta (evita enumeración de usuarios)
const invalidCredentials = () => {
  const error = new Error('Credenciales inválidas');
  error.statusCode = 401;
  return error;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw invalidCredentials();

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw invalidCredentials();

  if (user.notActive) {
    const error = new Error('Usuario inactivo');
    error.statusCode = 403;
    throw error;
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return {
    token,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
  };
};

module.exports = { registerUser, loginUser };
