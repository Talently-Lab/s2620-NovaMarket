const ORDER_STATUSES = ['CONFIRMED', 'CANCELLED'];

const isPlainObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isValidItem = (item) =>
  isPlainObject(item) &&
  typeof item.productId === 'string' &&
  item.productId.trim() !== '' &&
  Number.isInteger(item.quantity) &&
  item.quantity > 0;

const validateCreateOrder = ({ items, shippingAddress }) => {
  const errors = [];
  if (!Array.isArray(items) || !items.length) {
    errors.push('items es obligatorio y debe ser un arreglo no vacío');
  } else if (!items.every(isValidItem)) {
    errors.push('cada item debe tener productId (string) y quantity (entero > 0)');
  }
  if (!isPlainObject(shippingAddress) || !Object.keys(shippingAddress).length) {
    errors.push('shippingAddress es obligatorio y debe ser un objeto');
  }
  return errors;
};

const validateUpdateStatus = ({ status }) => {
  const errors = [];
  if (!ORDER_STATUSES.includes(status)) errors.push(`status debe ser uno de: ${ORDER_STATUSES.join(', ')}`);
  return errors;
};

module.exports = { validateCreateOrder, validateUpdateStatus };
