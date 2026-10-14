const { Router } = require('express');
const productController = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', productController.getAll);
router.post('/', authorize('ADMIN'), productController.create);
router.put('/:id', authorize('ADMIN'), productController.update);
router.delete('/:id', authorize('ADMIN'), productController.remove);

module.exports = router;
