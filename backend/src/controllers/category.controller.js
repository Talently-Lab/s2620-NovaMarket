const categoryService = require('../services/category.service');
const { successResponse, handleError } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    successResponse(res, 200, 'Categorías obtenidas con éxito', categories);
  } catch (error) {
    handleError(res, error, 'Error al obtener categorías');
  }
};

module.exports = { getAll };
