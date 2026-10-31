const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const isProd = process.env.NODE_ENV === 'production';
const connectionString = isProd ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
