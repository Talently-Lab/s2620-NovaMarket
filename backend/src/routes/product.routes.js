const { Router } = require('express');
const productController = require('../controllers/product.controller');

const router = Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
