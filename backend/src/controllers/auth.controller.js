const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');
const { validateRegister } = require('../validators/auth.validator');

const register = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateRegister(body);
  if (errors.length) {
    return errorResponse(res, 400, 'Datos de registro inválidos', `VALIDATION_ERROR: ${errors.join(', ')}`);
  }

  const { email, password, fullName } = body;
  try {
    const data = await authService.registerUser({ email, password, fullName });
    successResponse(res, 201, 'Usuario registrado con éxito', data);
  } catch (error) {
    errorResponse(res, error.statusCode || 500, 'Error al registrar usuario', error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if ([email, password].some((v) => typeof v !== 'string' || !v.trim())) {
    return errorResponse(res, 400, 'email y password son obligatorios');
  }

  try {
    const data = await authService.loginUser({ email, password });
    successResponse(res, 200, 'Sesión iniciada con éxito', data);
  } catch (error) {
    const message = error.statusCode ? error.message : 'Error al iniciar sesión';
    errorResponse(res, error.statusCode || 500, message, error.message);
  }
};

module.exports = { register, login };
