const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'Token no proporcionado');
  }
  try {
    req.user = verifyToken(header.split(' ')[1]);
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Token inválido o expirado');
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return errorResponse(res, 403, 'No tienes permisos para realizar esta acción');
  }
  next();
};

module.exports = { authenticate, authorize };
