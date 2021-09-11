const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.product_index_all);
router.get('/:id', productController.product_index_one);
router.post('/', productController.product_create);
router.delete('/:id', productController.product_delete);
router.put('/:id', productController.product_edit);

module.exports = router;
