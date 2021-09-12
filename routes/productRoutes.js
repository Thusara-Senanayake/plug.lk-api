const router = require('express').Router();
const productController = require('../controllers/productController');
const { requireSellerAuth } = require('../middlewares/authMiddleware');

router.get('/', productController.product_index_all);
router.get('/:id', productController.product_index_one);
router.post('/', requireSellerAuth, productController.product_create);
router.delete('/:id', requireSellerAuth, productController.product_delete);
router.put('/:id', requireSellerAuth, productController.product_edit);

module.exports = router;
