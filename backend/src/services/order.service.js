const { Prisma } = require('@prisma/client');
const prisma = require('../config/prisma');

const include = {
  orderItems: { include: { product: { select: { name: true } } } },
};

const httpError = (statusCode, code, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
};

const formatOrder = ({ orderItems, totalAmount, ...order }) => ({
  ...order,
  totalAmount: totalAmount.toFixed(2),
  items: orderItems.map(({ productId, product, quantity, unitPrice }) => ({
    productId,
    productName: product.name,
    quantity,
    unitPrice: unitPrice.toFixed(2),
  })),
});

const groupByProduct = (items) => {
  const quantities = new Map();
  for (const { productId, quantity } of items) {
    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }
  return quantities;
};

const restoreStock = (tx, orderItems) =>
  Promise.all(
    orderItems.map(({ productId, quantity }) =>
      tx.product.update({ where: { id: productId }, data: { stock: { increment: quantity } } })
    )
  );

const createOrder = async (userId, requestedItems, shippingAddress) => {
  const order = await prisma.$transaction(async (tx) => {
    const items = [];
    for (const [productId, quantity] of groupByProduct(requestedItems)) {
      const reserved = await tx.product.updateMany({
        where: { id: productId, notActive: false, stock: { gte: quantity } },
        data: { stock: { decrement: quantity } },
      });
      if (!reserved.count) {
        throw httpError(409, 'INSUFFICIENT_STOCK', `Stock insuficiente o producto no disponible: ${productId}`);
      }
      const { price } = await tx.product.findUnique({ where: { id: productId }, select: { price: true } });
      items.push({ productId, quantity, unitPrice: price });
    }

    const totalAmount = items.reduce(
      (sum, { unitPrice, quantity }) => sum.add(unitPrice.mul(quantity)),
      new Prisma.Decimal(0)
    );

    return tx.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        orderItems: { create: items },
      },
      include,
    });
  });

  return formatOrder(order);
};

const getOrdersByUser = async (userId) => {
  const orders = await prisma.order.findMany({ where: { userId }, include, orderBy: { createdAt: 'desc' } });
  return orders.map(formatOrder);
};

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({ include, orderBy: { createdAt: 'desc' } });
  return orders.map(formatOrder);
};

// Un cliente solo ve sus propias órdenes; responde 404 para no revelar órdenes ajenas
const getOrderById = async (id, user) => {
  const where = user.role === 'ADMIN' ? { id } : { id, userId: user.id };
  const order = await prisma.order.findFirst({ where, include });
  return order ? formatOrder(order) : null;
};

const changeStatus = (id, status, ownerId) =>
  prisma.$transaction(async (tx) => {
    const where = ownerId ? { id, userId: ownerId } : { id };
    const order = await tx.order.findFirst({ where, include });
    if (!order) throw httpError(404, 'ORDER_NOT_FOUND', 'Orden no encontrada');
    if (order.status === 'CANCELLED') {
      throw httpError(409, 'ORDER_CANCELLED', 'La orden ya está cancelada y no puede modificarse');
    }

    const updated = await tx.order.updateMany({
      where: { id, status: { not: 'CANCELLED' } },
      data: { status },
    });
    if (!updated.count) {
      throw httpError(409, 'ORDER_CANCELLED', 'La orden ya está cancelada y no puede modificarse');
    }
    if (status === 'CANCELLED') await restoreStock(tx, order.orderItems);

    return { id, status };
  });

const cancelOrder = (id, userId) => changeStatus(id, 'CANCELLED', userId);

const updateOrderStatus = (id, status) => changeStatus(id, status);

module.exports = { createOrder, getOrdersByUser, getAllOrders, getOrderById, cancelOrder, updateOrderStatus };
