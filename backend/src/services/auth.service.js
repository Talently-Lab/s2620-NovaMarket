const prisma = require('../config/prisma');
const { hashPassword } = require('../utils/hash');
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

module.exports = { registerUser };
