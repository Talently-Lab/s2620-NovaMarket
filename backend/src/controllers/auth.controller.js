const authService = require('../services/auth.service');
const { successResponse, validationErrorResponse, handleError } = require('../utils/response');
const { validateRegister } = require('../validators/auth.validator');

const register = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateRegister(body);
  if (errors.length) {
    return validationErrorResponse(res, 'Datos de registro inválidos', errors);
  }

  const { email, password, fullName } = body;
  try {
    const data = await authService.registerUser({ email, password, fullName });
    successResponse(res, 201, 'Usuario registrado con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al registrar usuario');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body ?? {};

  if ([email, password].some((v) => typeof v !== 'string' || !v.trim())) {
    return validationErrorResponse(res, 'Datos de inicio de sesión inválidos', ['email y password son obligatorios']);
  }

  try {
    const data = await authService.loginUser({ email, password });
    successResponse(res, 200, 'Sesión iniciada con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al iniciar sesión');
  }
};

const me = async (req, res) => {
  try {
    const data = await authService.getProfile(req.user.id);
    successResponse(res, 200, 'Perfil obtenido con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al obtener el perfil');
  }
};

module.exports = { register, login, me };
