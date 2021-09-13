const router = require('express').Router();
const sellerController = require('../controllers/sellerController');
const {
	requireAdminAuth,
	requireSellerAuth,
} = require('../middlewares/authMiddleware');

router.get('/', requireAdminAuth, sellerController.seller_index_all);
router.get('/:id', requireSellerAuth, sellerController.seller_index_one);
router.post('/', sellerController.seller_create);
router.delete('/:id', requireSellerAuth, sellerController.seller_delete);
router.put('/:id', requireSellerAuth, sellerController.seller_edit);
router.post('/login', sellerController.seller_login);

module.exports = router;
