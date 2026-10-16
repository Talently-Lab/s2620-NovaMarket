const MAX_PRICE = 99999999.99;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const validateCreateProduct = ({ name, price, category, stock }) => {
  const errors = [];
  if (!isNonEmptyString(name)) errors.push('name es obligatorio');
  if (!isNonEmptyString(category)) errors.push('category es obligatorio');
  if (typeof price !== 'number' || !/^\d+(\.\d{1,2})?$/.test(String(price)) || price > MAX_PRICE) {
    errors.push('price debe ser un número >= 0 con máximo 2 decimales');
  }
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    errors.push('stock debe ser un entero >= 0');
  }
  return errors;
};

module.exports = { validateCreateProduct };
