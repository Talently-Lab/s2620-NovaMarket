const { isValidUuid } = require('../validators/common.validator');
const { errorResponse } = require('../utils/response');

const validateUuidParam = (paramName = 'id') => (req, res, next) => {
  if (!isValidUuid(req.params[paramName])) {
    return errorResponse(res, 400, 'ID inválido', 'INVALID_ID');
  }
  next();
};

module.exports = { validateUuidParam };
