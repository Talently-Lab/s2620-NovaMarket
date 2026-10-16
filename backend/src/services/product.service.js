const prisma = require('../config/prisma');

// Decimal pierde los ceros finales al serializar a JSON
const formatProduct = (product) => ({ ...product, price: product.price.toFixed(2) });

const getAllProducts = async (category) => {
  const where = category ? { category: { equals: category, mode: 'insensitive' } } : {};
  const products = await prisma.product.findMany({ where });
  return products.map(formatProduct);
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? formatProduct(product) : null;
};

const createProduct = async (data) => {
  return formatProduct(await prisma.product.create({ data }));
};

const updateProduct = async (id, data) => {
  return formatProduct(await prisma.product.update({ where: { id }, data }));
};

const deleteProduct = async (id) => {
  const deleted = await prisma.product.delete({ where: { id } });
  return { id: deleted.id };
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
