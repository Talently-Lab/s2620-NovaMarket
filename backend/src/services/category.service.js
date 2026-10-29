const prisma = require('../config/prisma');

const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
};

const getCategoryByName = async (name) => {
  return prisma.category.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } });
};

module.exports = { getAllCategories, getCategoryByName };
