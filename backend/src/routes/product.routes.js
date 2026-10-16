const { Router } = require('express');
const productController = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authenticate, authorize('ADMIN'), productController.create);
router.put('/:id', authenticate, authorize('ADMIN'), productController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), productController.remove);

module.exports = router;
