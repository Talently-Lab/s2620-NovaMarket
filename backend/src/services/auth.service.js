const prisma = require('../config/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { httpError } = require('../utils/httpError');

const registerUser = async ({ email, password, fullName }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw httpError(409, 'EMAIL_ALREADY_REGISTERED', 'El email ya está registrado');

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, fullName },
    select: { id: true, email: true, fullName: true, role: true, createdAt: true },
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
};

// Mismo error para email inexistente y contraseña incorrecta (evita enumeración de usuarios)
const invalidCredentials = () => httpError(401, 'INVALID_CREDENTIALS', 'Credenciales inválidas');
const userInactive = () => httpError(403, 'USER_INACTIVE', 'Usuario inactivo');

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw invalidCredentials();

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw invalidCredentials();

  if (user.notActive) throw userInactive();

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return {
    token,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
  };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, fullName: true, role: true, notActive: true, createdAt: true },
  });

  if (!user) throw httpError(401, 'USER_NOT_FOUND', 'Usuario no encontrado');

  if (user.notActive) throw userInactive();

  const { notActive, ...profile } = user;
  return profile;
};

module.exports = { registerUser, loginUser, getProfile };
