const router = require('express').Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);

module.exports = router;
