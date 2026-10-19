const productService = require('../services/product.service');
const { successResponse, errorResponse } = require('../utils/response');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/product.validator');

const getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query.category);
    successResponse(res, 200, 'Productos obtenidos con éxito', products);
  } catch (error) {
    errorResponse(res, 500, 'Error al obtener productos', error.message);
  }
};

const getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return errorResponse(res, 404, 'Producto no encontrado');
    }
    successResponse(res, 200, 'Producto obtenido con éxito', product);
  } catch (error) {
    errorResponse(res, 500, 'Error al obtener producto', error.message);
  }
};

const create = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateCreateProduct(body);
  if (errors.length) {
    return errorResponse(res, 400, 'Datos de producto inválidos', `VALIDATION_ERROR: ${errors.join(', ')}`);
  }

  const { name, description, price, stock = 0, imageUrl, categoryId, brand } = body;
  try {
    const product = await productService.createProduct({ name, description, price, stock, imageUrl, categoryId, brand });
    successResponse(res, 201, 'Producto creado con éxito', product);
  } catch (error) {
    if (error.code === 'P2003') {
      return errorResponse(res, 400, 'Categoría inexistente');
    }
    errorResponse(res, 500, 'Error al crear producto', error.message);
  }
};

const update = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateUpdateProduct(body);
  if (errors.length) {
    return errorResponse(res, 400, 'Datos de producto inválidos', `VALIDATION_ERROR: ${errors.join(', ')}`);
  }

  const { name, description, price, stock, imageUrl, categoryId, brand } = body;
  try {
    const product = await productService.updateProduct(req.params.id, { name, description, price, stock, imageUrl, categoryId, brand });
    successResponse(res, 200, 'Producto actualizado con éxito', product);
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 404, 'Producto no encontrado');
    }
    if (error.code === 'P2003') {
      return errorResponse(res, 400, 'Categoría inexistente');
    }
    errorResponse(res, 500, 'Error al actualizar producto', error.message);
  }
};

const remove = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    successResponse(res, 200, 'Producto eliminado con éxito', data);
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 404, 'Producto no encontrado');
    }
    errorResponse(res, 500, 'Error al eliminar producto', error.message);
  }
};

module.exports = { getAll, getById, create, update, remove };
