require('dotenv').config();
const prisma = require('../src/config/prisma');

const products = [
  { name: 'Rastreador inteligente compacto', category: 'Wearables', price: '13.9', stock: 50, description: 'Rastreador de objetos con conectividad inalámbrica.', imageUrl: 'https://cdn.novamarket.com/images/101.jpg', brand: 'Zonic' },
  { name: 'Dispositivo de streaming HD compacto', category: 'Monitores y TV', price: '42.2', stock: 185, description: 'Reproductor multimedia para streaming en alta definición.', imageUrl: 'https://cdn.novamarket.com/images/102.jpg', brand: 'StreamX' },
  { name: 'Auriculares inalámbricos Pro de alta fidelidad', category: 'Audio', price: '160', stock: 50, description: 'Auriculares in-ear con cancelación activa de ruido.', imageUrl: 'https://cdn.novamarket.com/images/103.jpg', brand: 'AuraSound' },
  { name: 'Tablet multimedia de 10 pulgadas', category: 'Tablets y e-readers', price: '135', stock: 280, description: 'Tablet para entretenimiento con pantalla HD de 10 pulgadas.', imageUrl: 'https://cdn.novamarket.com/images/104.jpg', brand: 'NovaTab' },
  { name: 'Reloj inteligente deportivo con GPS', category: 'Wearables', price: '428', stock: 505, description: 'Smartwatch avanzado con monitoreo físico continuo.', imageUrl: 'https://cdn.novamarket.com/images/105.jpg', brand: 'Chronos' },
  { name: 'Altavoz Bluetooth portátil de 20W', category: 'Audio', price: '21', stock: 0, description: 'Altavoz inalámbrico resistente a salpicaduras.', imageUrl: 'https://cdn.novamarket.com/images/106.jpg', brand: 'AuraSound' },
  { name: 'Altavoz inteligente de asistencia por voz', category: 'Hogar inteligente', price: '45', stock: 3, description: 'Asistente de voz para control del hogar conectado.', imageUrl: 'https://cdn.novamarket.com/images/107.jpg', brand: 'SmartHome' },
  { name: 'Lector de libros electrónicos de 16 GB', category: 'Tablets y e-readers', price: '175', stock: 650, description: 'Pantalla antirreflejo ideal para lectura prolongada.', imageUrl: 'https://cdn.novamarket.com/images/108.jpg', brand: 'NovaTab' },
  { name: 'Monitor plano FHD de 23.8 pulgadas', category: 'Monitores y TV', price: '63.85', stock: 251, description: 'Monitor de alta resolución con tecnología de protección visual.', imageUrl: 'https://cdn.novamarket.com/images/109.jpg', brand: 'VisionTech' },
  { name: 'Smart TV 4K de 55 pulgadas', category: 'Monitores y TV', price: '230', stock: 180, description: 'Televisor inteligente con resolución Ultra HD 4K.', imageUrl: 'https://cdn.novamarket.com/images/110.jpg', brand: 'VisionTech' },
  { name: 'Cámara digital compacta de 16MP', category: 'Cámaras', price: '122.1', stock: 360, description: 'Cámara fotográfica con zoom óptico de 5X.', imageUrl: 'https://cdn.novamarket.com/images/111.jpg', brand: 'Optika' },
  { name: 'Tarjeta de memoria SDHC de 32 GB', category: 'Accesorios', price: '19.3', stock: 850, description: 'Memoria externa de alta velocidad para dispositivos.', imageUrl: 'https://cdn.novamarket.com/images/112.jpg', brand: 'DataFast' },
  { name: 'Cable HDMI de alta velocidad 8K', category: 'Accesorios', price: '5.69', stock: 450, description: 'Cable trenzado de alta durabilidad de 6.6 pies.', imageUrl: 'https://cdn.novamarket.com/images/113.jpg', brand: 'DataFast' },
  { name: 'Tocadiscos de vinilo con Bluetooth', category: 'Audio', price: '52.2', stock: 120, description: 'Reproductor de vinilos con receptor inalámbrico integrado.', imageUrl: 'https://cdn.novamarket.com/images/114.jpg', brand: 'AuraSound' },
  { name: 'Monitor de 24 pulgadas Full HD', category: 'Monitores y TV', price: '96', stock: 300, description: 'Monitor de diseño ergonómico y bajo consumo.', imageUrl: 'https://cdn.novamarket.com/images/115.jpg', brand: 'VisionTech' },
  { name: 'Teléfono inteligente Andrus liberado 5G', category: 'Smartphones', price: '350', stock: 750, description: 'Smartphone de gama media con gran autonomía de batería.', imageUrl: 'https://cdn.novamarket.com/images/116.jpg', brand: 'NexusPhone' },
  { name: 'Teléfono inteligente avanzado 5G de 512 GB', category: 'Smartphones', price: '1138', stock: 321, description: 'Dispositivo móvil de alta gama con máxima capacidad de almacenamiento.', imageUrl: 'https://cdn.novamarket.com/images/117.jpg', brand: 'NexusPhone' },
  { name: 'Cable de carga USB-C a USB-C de 2m', category: 'Accesorios', price: '16.8', stock: 200, description: 'Cable reforzado de carga rápida y transferencia de datos.', imageUrl: 'https://cdn.novamarket.com/images/118.jpg', brand: 'DataFast' },
  { name: 'Auriculares inalámbricos de diadema', category: 'Audio', price: '97.4', stock: 115, description: 'Cascos de sonido envolvente con diseño ergonómico.', imageUrl: 'https://cdn.novamarket.com/images/119.jpg', brand: 'AuraSound' },
  { name: 'Enchufe inteligente compatible con asistentes', category: 'Hogar inteligente', price: '11.39', stock: 854, description: 'Controla la corriente de tus electrodomésticos de forma remota.', imageUrl: 'https://cdn.novamarket.com/images/120.jpg', brand: 'SmartHome' },
];

const main = async () => {
  const existing = await prisma.product.findMany({ select: { name: true } });
  const existingNames = new Set(existing.map((p) => p.name));
  const data = products.filter((p) => !existingNames.has(p.name));

  const { count } = await prisma.product.createMany({ data });
  console.log(`Productos: ${products.length}, ya existentes: ${products.length - data.length}, insertados: ${count}`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
