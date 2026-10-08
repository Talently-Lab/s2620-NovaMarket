const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
  const { email, password, fullName } = req.body || {};

  if ([email, password, fullName].some((v) => typeof v !== 'string' || !v.trim())) {
    return errorResponse(res, 400, 'email, password y fullName son obligatorios');
  }
  if (!EMAIL_REGEX.test(email)) {
    return errorResponse(res, 400, 'Formato de email inválido');
  }
  if (password.length < 8) {
    return errorResponse(res, 400, 'La contraseña debe tener al menos 8 caracteres');
  }

  try {
    const data = await authService.registerUser({ email, password, fullName });
    successResponse(res, 201, 'Usuario registrado con éxito', data);
  } catch (error) {
    errorResponse(res, error.statusCode || 500, 'Error al registrar usuario', error.message);
  }
};

module.exports = { register };
