const prisma = require('../config/prisma');

// Decimal pierde los ceros finales al serializar a JSON
const include = { category: true };

const formatProduct = (product) => ({ ...product, price: product.price.toFixed(2) });

const getAllProducts = async () => {
  const products = await prisma.product.findMany({ where: { notActive: false }, include });
  return products.map(formatProduct);
};

const getProductsByCategoryId = async (categoryId) => {
  const products = await prisma.product.findMany({ where: { categoryId, notActive: false }, include });
  return products.map(formatProduct);
};

const getProductById = async (id) => {
  const product = await prisma.product.findFirst({ where: { id, notActive: false }, include });
  return product ? formatProduct(product) : null;
};

const createProduct = async (data) => {
  return formatProduct(await prisma.product.create({ data, include }));
};

const updateProduct = async (id, data) => {
  return formatProduct(await prisma.product.update({ where: { id, notActive: false }, data, include }));
};

const deleteProduct = async (id) => {
  const deleted = await prisma.product.update({ where: { id, notActive: false }, data: { notActive: true } });
  return { id: deleted.id };
};

module.exports = { getAllProducts, getProductsByCategoryId, getProductById, createProduct, updateProduct, deleteProduct };
