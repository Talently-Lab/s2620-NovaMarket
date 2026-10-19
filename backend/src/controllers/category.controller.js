const categoryService = require('../services/category.service');
const { successResponse, errorResponse } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    successResponse(res, 200, 'Categorías obtenidas con éxito', categories);
  } catch (error) {
    errorResponse(res, 500, 'Error al obtener categorías', error.message);
  }
};

module.exports = { getAll };
