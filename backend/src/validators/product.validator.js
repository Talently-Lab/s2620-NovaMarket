const MAX_PRICE = 99999999.99;
const UPDATABLE_FIELDS = ['name', 'description', 'price', 'stock', 'imageUrl', 'category', 'brand'];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
const isValidPrice = (value) =>
  typeof value === 'number' && /^\d+(\.\d{1,2})?$/.test(String(value)) && value <= MAX_PRICE;
const isValidStock = (value) => Number.isInteger(value) && value >= 0;

const PRICE_ERROR = 'price debe ser un número >= 0 con máximo 2 decimales';
const STOCK_ERROR = 'stock debe ser un entero >= 0';

const validateCreateProduct = ({ name, price, category, stock }) => {
  const errors = [];
  if (!isNonEmptyString(name)) errors.push('name es obligatorio');
  if (!isNonEmptyString(category)) errors.push('category es obligatorio');
  if (!isValidPrice(price)) errors.push(PRICE_ERROR);
  if (stock !== undefined && !isValidStock(stock)) errors.push(STOCK_ERROR);
  return errors;
};

const validateUpdateProduct = (body) => {
  const { name, price, category, stock } = body;
  if (!UPDATABLE_FIELDS.some((field) => body[field] !== undefined)) {
    return ['debe enviar al menos un campo para actualizar'];
  }
  const errors = [];
  if (name !== undefined && !isNonEmptyString(name)) errors.push('name no puede estar vacío');
  if (category !== undefined && !isNonEmptyString(category)) errors.push('category no puede estar vacío');
  if (price !== undefined && !isValidPrice(price)) errors.push(PRICE_ERROR);
  if (stock !== undefined && !isValidStock(stock)) errors.push(STOCK_ERROR);
  return errors;
};

module.exports = { validateCreateProduct, validateUpdateProduct };
