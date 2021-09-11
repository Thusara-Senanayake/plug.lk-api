const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.product_index_all);
router.get('/:id', productController.product_index_one);
router.create('/:id', productController.product_create);
router.get('/:id', productController.product_delete);
router.get('/:id', productController.product_edit);

module.exports = router;
