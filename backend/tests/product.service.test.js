jest.mock('../src/config/prisma', () => ({
  product: { findMany: jest.fn(), findUnique: jest.fn() },
}));

const prisma = require('../src/config/prisma');
const { getAllProducts, getProductById } = require('../src/services/product.service');

const dbProduct = { id: 'uuid-1', name: 'Teclado', price: 49.9, stock: 10, category: 'Periféricos' };

describe('productService.getAllProducts', () => {
  beforeEach(() => {
    prisma.product.findMany.mockReset();
  });

  it('debe consultar sin filtro si no se envía categoría', async () => {
    prisma.product.findMany.mockResolvedValue([]);

    await getAllProducts();

    expect(prisma.product.findMany).toHaveBeenCalledWith({ where: {} });
  });

  it('debe filtrar por categoría sin distinguir mayúsculas', async () => {
    prisma.product.findMany.mockResolvedValue([]);

    await getAllProducts('perifericos');

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { category: { equals: 'perifericos', mode: 'insensitive' } },
    });
  });

  it('debe formatear el precio a 2 decimales', async () => {
    prisma.product.findMany.mockResolvedValue([dbProduct, { ...dbProduct, id: 'uuid-2', price: 10 }]);

    const result = await getAllProducts();

    expect(result.map((p) => p.price)).toEqual(['49.90', '10.00']);
    expect(result[0]).toEqual({ ...dbProduct, price: '49.90' });
  });
});

describe('productService.getProductById', () => {
  beforeEach(() => {
    prisma.product.findUnique.mockReset();
  });

  it('debe retornar el producto con el precio formateado', async () => {
    prisma.product.findUnique.mockResolvedValue(dbProduct);

    const result = await getProductById('uuid-1');

    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
    expect(result).toEqual({ ...dbProduct, price: '49.90' });
  });

  it('debe retornar null si el producto no existe', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    const result = await getProductById('no-existe');

    expect(result).toBeNull();
  });
});
