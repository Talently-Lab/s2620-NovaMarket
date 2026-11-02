const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validateUuidParam } = require('../middlewares/validateId.middleware');

const router = Router();

router.use(authenticate);

router.post('/', orderController.create);
router.get('/my', orderController.getMyOrders);
router.get('/', authorize('ADMIN'), orderController.getAll);
router.get('/:id', validateUuidParam(), orderController.getById);
router.put('/:id/cancel', validateUuidParam(), orderController.cancel);
router.put('/:id/status', authorize('ADMIN'), validateUuidParam(), orderController.updateStatus);

module.exports = router;
