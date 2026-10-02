// src/config/prisma.js
const { PrismaClient } = require('@prisma/client');

// Se pasa de forma explícita process.env.DATABASE_URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

module.exports = prisma;