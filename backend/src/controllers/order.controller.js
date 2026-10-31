const orderService = require('../services/order.service');
const { successResponse, errorResponse } = require('../utils/response');
const { validateCreateOrder, validateUpdateStatus } = require('../validators/order.validator');

const handleError = (res, error, fallbackMessage) => {
  if (error.statusCode) {
    return errorResponse(res, error.statusCode, error.message, error.code);
  }
  errorResponse(res, 500, fallbackMessage, error.message);
};

const create = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateCreateOrder(body);
  if (errors.length) {
    return errorResponse(res, 400, 'Datos del pedido inválidos', `VALIDATION_ERROR: ${errors.join(', ')}`);
  }

  try {
    const order = await orderService.createOrder(req.user.id, body.items, body.shippingAddress);
    successResponse(res, 201, 'Pedido creado con éxito', order);
  } catch (error) {
    handleError(res, error, 'No se pudo crear el pedido');
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    successResponse(res, 200, 'Órdenes obtenidas con éxito', orders);
  } catch (error) {
    handleError(res, error, 'Error al obtener órdenes');
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    successResponse(res, 200, 'Órdenes obtenidas con éxito', orders);
  } catch (error) {
    handleError(res, error, 'Error al obtener órdenes');
  }
};

const getById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user);
    if (!order) {
      return errorResponse(res, 404, 'Orden no encontrada', 'ORDER_NOT_FOUND');
    }
    successResponse(res, 200, 'Orden obtenida con éxito', order);
  } catch (error) {
    handleError(res, error, 'Error al obtener orden');
  }
};

const cancel = async (req, res) => {
  try {
    const data = await orderService.cancelOrder(req.params.id, req.user.id);
    successResponse(res, 200, 'Orden cancelada con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al cancelar orden');
  }
};

const updateStatus = async (req, res) => {
  const body = req.body ?? {};
  const errors = validateUpdateStatus(body);
  if (errors.length) {
    return errorResponse(res, 400, 'Estado de orden inválido', `VALIDATION_ERROR: ${errors.join(', ')}`);
  }

  try {
    const data = await orderService.updateOrderStatus(req.params.id, body.status);
    successResponse(res, 200, 'Estado de la orden actualizado con éxito', data);
  } catch (error) {
    handleError(res, error, 'Error al actualizar estado de la orden');
  }
};

module.exports = { create, getMyOrders, getAll, getById, cancel, updateStatus };
