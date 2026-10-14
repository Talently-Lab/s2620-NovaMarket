const productService = require('../services/product.service');
const { successResponse, errorResponse } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    successResponse(res, 200, 'Productos obtenidos con éxito', products);
  } catch (error) {
    errorResponse(res, 500, 'Error al obtener productos', error.message);
  }
};

const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    successResponse(res, 201, 'Producto creado con éxito', product);
  } catch (error) {
    errorResponse(res, 500, 'Error al crear producto', error.message);
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    successResponse(res, 200, 'Producto actualizado con éxito', product);
  } catch (error) {
    errorResponse(res, 500, 'Error al actualizar producto', error.message);
  }
};

const remove = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    successResponse(res, 200, 'Producto eliminado con éxito', data);
  } catch (error) {
    errorResponse(res, 500, 'Error al eliminar producto', error.message);
  }
};

module.exports = { getAll, create, update, remove };
