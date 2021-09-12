const router = require('express').Router();
const productController = require('../controllers/productController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/', productController.product_index_all);
router.get('/:id', productController.product_index_one);
router.post('/', requireAuth, productController.product_create);
router.delete('/:id', requireAuth, productController.product_delete);
router.put('/:id', requireAuth, productController.product_edit);

module.exports = router;
