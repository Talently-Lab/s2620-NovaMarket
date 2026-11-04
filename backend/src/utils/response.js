const successResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({ success: true, message, data });
};

const errorResponse = (res, statusCode, message, error) => {
  res.status(statusCode).json({ success: false, message, error });
};

const validationErrorResponse = (res, message, errors) => {
  errorResponse(res, 400, message, `VALIDATION_ERROR: ${errors.join(', ')}`);
};

const handleError = (res, error, fallbackMessage, knownErrors = {}) => {
  const known = knownErrors[error.code];
  if (known) {
    return errorResponse(res, known.statusCode, known.message, known.code);
  }
  if (error.statusCode) {
    return errorResponse(res, error.statusCode, error.message, error.code);
  }
  console.error(error);
  errorResponse(res, 500, fallbackMessage, 'INTERNAL_ERROR');
};

module.exports = { successResponse, errorResponse, validationErrorResponse, handleError };
