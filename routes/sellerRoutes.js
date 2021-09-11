const router = require('express').Router();
const sellerController = require('../controllers/sellerController');

router.get('/', sellerController.seller_index_all);
router.get('/:id', sellerController.seller_index_one);
router.post('/', sellerController.seller_create);
router.delete('/:id', sellerController.seller_delete);
router.put('/:id', sellerController.seller_edit);

module.exports = router;