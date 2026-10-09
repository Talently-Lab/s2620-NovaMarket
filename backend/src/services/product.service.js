const prisma = require('../config/prisma');

// Decimal pierde los ceros finales al serializar a JSON
const formatProduct = (product) => ({ ...product, price: product.price.toFixed(2) });

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products.map(formatProduct);
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

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
