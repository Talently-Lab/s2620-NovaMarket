const { successResponse } = require('../utils/response');

const check = (req, res) => {
  successResponse(res, 200, 'API operativa', { status: 'OK' });
};

module.exports = { check };
