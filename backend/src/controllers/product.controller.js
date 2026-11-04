const productService = require('../services/product.service');
const categoryService = require('../services/category.service');
const { successResponse, errorResponse, validationErrorResponse, handleError } = require('../utils/response');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/product.validator');

const PRODUCT_NOT_FOUND = { statusCode: 404, code: 'PRODUCT_NOT_FOUND', message: 'Producto no encontrado' };
const CATEGORY_NOT_FOUND = { statusCode: 400, code: 'CATEGORY_NOT_FOUND', message: 'Categoría inexistente' };

const getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    successResponse(res, 200, 'Productos obtenidos con éxito', products);
  } catch (error) {
    handleError(res, error, 'Error al obtener productos');
  }
};

const getByCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryByName(req.params.categoryName.trim());
    if (!category) {
      return errorResponse(res, 404, 'Categoría no encontrada', 'CATEGORY_NOT_FOUND');
    }
    const products = await productService.getProductsByCategoryId(category.id);
    successResponse(res, 200, 'Productos obtenidos con éxito', products);
  } catch (error) {
    handleError(res, error, 'Error al obtener productos');
  }
};

const getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return errorResponse(res, 404, PRODUCT_NOT_FOUND.message, PRODUCT_NOT_FOUND.code);
    }
    successResponse(res, 200, 'Producto obtenido con éxito', product);
  } catch (error) {
    handleError(res, error, 'Error al obtener producto');
  }
};

const create = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateCreateProduct(body);
  if (errors.length) {
    return validationErrorResponse(res, 'Datos de producto inválidos', errors);
  }

  const { name, description, price, stock = 0, imageUrl, categoryId, brand } = body;
  try {
    const product = await productService.createProduct({ name, description, price, stock, imageUrl, categoryId, brand });
    successResponse(res, 201, 'Producto creado con éxito', product);
  } catch (error) {
    handleError(res, error, 'Error al crear producto', { P2003: CATEGORY_NOT_FOUND });
  }
};

const update = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateUpdateProduct(body);
  if (errors.length) {
    return validationErrorResponse(res, 'Datos de producto inválidos', errors);
  }

  const { name, description, price, stock, imageUrl, categoryId, brand } = body;
  try {
    const product = await productService.updateProduct(req.params.id, { name, description, price, stock, imageUrl, categoryId, brand });
    successResponse(res, 200, 'Producto actualizado con éxito', product);
  } catch (error) {
    handleError(res, error, 'Error al actualizar producto', { P2025: PRODUCT_NOT_FOUND, P2003: CATEGORY_NOT_FOUND });
  }
};

const remove = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    successResponse(res, 200, 'Producto eliminado con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al eliminar producto', { P2025: PRODUCT_NOT_FOUND });
  }
};

module.exports = { getAll, getByCategory, getById, create, update, remove };
