const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.product_index_all);

module.exports = router;
