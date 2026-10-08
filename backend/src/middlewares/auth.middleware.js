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

module.exports = { authenticate };
