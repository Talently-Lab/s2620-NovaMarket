const prisma = require('../config/prisma');

const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
};

module.exports = { getAllCategories };
