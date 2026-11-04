const { errorResponse, handleError } = require('../utils/response');

const notFound = (req, res) => {
  errorResponse(res, 404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND');
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error.type === 'entity.parse.failed') {
    return errorResponse(res, 400, 'El cuerpo de la petición no es un JSON válido', 'INVALID_JSON');
  }
  if (error.type === 'entity.too.large') {
    return errorResponse(res, 413, 'El cuerpo de la petición es demasiado grande', 'PAYLOAD_TOO_LARGE');
  }
  handleError(res, error, 'Error interno del servidor');
};

module.exports = { notFound, errorHandler };
