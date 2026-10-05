const prisma = require('../config/prisma');

const getAllProducts = () => {
  return prisma.product.findMany();
};

const createProduct = (data) => {
  return prisma.product.create({ data });
};

const updateProduct = (id, data) => {
  return prisma.product.update({ where: { id }, data });
};

const deleteProduct = async (id) => {
  const deleted = await prisma.product.delete({ where: { id } });
  return { id: deleted.id };
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
