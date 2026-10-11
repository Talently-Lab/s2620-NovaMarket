require('dotenv').config();
const fs = require('fs');
const path = require('path');
const prisma = require('../src/config/prisma');

const CSV_PATH = path.join(__dirname, '..', 'mock_catalogo_productos.csv - mock_catalogo_productos.csv (1).csv');

// Columnas: ID,Nombre,Categoría,Precio Regular,Precio Oferta,Stock,Descripción,Imagen URL,Marca,Activo
const parseProducts = () => {
  const lines = fs.readFileSync(CSV_PATH, 'utf8').trim().split(/\r?\n/).slice(1);

  return lines.map((line) => {
    const cols = line.split(',');
    if (cols.length !== 10) throw new Error(`Fila con formato inesperado: ${line}`);

    const [, name, category, price, , stock, description, image, brand] = cols;
    // Las URLs vienen en formato markdown: [url](url)
    const url = image.match(/\((https?:[^)]+)\)/);

    return {
      name,
      category,
      price,
      stock: parseInt(stock, 10),
      description,
      imageUrl: url ? url[1] : image,
      brand,
    };
  });
};

const main = async () => {
  const products = parseProducts();
  const existing = await prisma.product.findMany({ select: { name: true } });
  const existingNames = new Set(existing.map((p) => p.name));
  const data = products.filter((p) => !existingNames.has(p.name));

  const { count } = await prisma.product.createMany({ data });
  console.log(`Productos en CSV: ${products.length}, ya existentes: ${products.length - data.length}, insertados: ${count}`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
