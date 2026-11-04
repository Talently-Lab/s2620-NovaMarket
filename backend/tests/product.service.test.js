jest.mock('../src/config/prisma', () => ({
  product: { findMany: jest.fn(), findFirst: jest.fn() },
}));

const prisma = require('../src/config/prisma');
const { getAllProducts, getProductsByCategoryId, getProductById } = require('../src/services/product.service');

const PRODUCT_ID = '3f2c1b9a-8d4e-4f6a-9b2c-1e5d7a8c9f01';
const dbProduct = { id: PRODUCT_ID, name: 'Teclado', price: 49.9, stock: 10, categoryId: 1000, category: { id: 1000, name: 'Periféricos' } };

describe('productService.getAllProducts', () => {
  beforeEach(() => {
    prisma.product.findMany.mockReset();
  });

  it('debe consultar solo productos activos', async () => {
    prisma.product.findMany.mockResolvedValue([]);

    await getAllProducts();

    expect(prisma.product.findMany).toHaveBeenCalledWith({ where: { notActive: false }, include: { category: true } });
  });

  it('debe formatear el precio a 2 decimales', async () => {
    prisma.product.findMany.mockResolvedValue([dbProduct, { ...dbProduct, id: 'otro', price: 10 }]);

    const result = await getAllProducts();

    expect(result.map((p) => p.price)).toEqual(['49.90', '10.00']);
    expect(result[0]).toEqual({ ...dbProduct, price: '49.90' });
  });
});

describe('productService.getProductsByCategoryId', () => {
  beforeEach(() => {
    prisma.product.findMany.mockReset();
  });

  it('debe filtrar por categoryId y solo productos activos', async () => {
    prisma.product.findMany.mockResolvedValue([dbProduct]);

    const result = await getProductsByCategoryId(1000);

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { categoryId: 1000, notActive: false },
      include: { category: true },
    });
    expect(result).toEqual([{ ...dbProduct, price: '49.90' }]);
  });
});

describe('productService.getProductById', () => {
  beforeEach(() => {
    prisma.product.findFirst.mockReset();
  });

  it('debe retornar el producto activo con el precio formateado', async () => {
    prisma.product.findFirst.mockResolvedValue(dbProduct);

    const result = await getProductById(PRODUCT_ID);

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: PRODUCT_ID, notActive: false },
      include: { category: true },
    });
    expect(result).toEqual({ ...dbProduct, price: '49.90' });
  });

  it('debe retornar null si el producto no existe o está inactivo', async () => {
    prisma.product.findFirst.mockResolvedValue(null);

    const result = await getProductById(PRODUCT_ID);

    expect(result).toBeNull();
  });
});
