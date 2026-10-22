const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.post('/', orderController.create);
router.get('/my', orderController.getMyOrders);
router.get('/admin', authorize('ADMIN'), orderController.getAll);
router.get('/:id', orderController.getById);
router.put('/:id/cancel', orderController.cancel);
router.put('/:id/status', authorize('ADMIN'), orderController.updateStatus);

module.exports = router;
