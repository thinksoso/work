var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/index');

var checkNotLogin = require('../controllers/check').checkNotLogin;
var checkLogin = require('../controllers/check').checkLogin;

/* GET home page. */
router.get('/',checkLogin, index_controller.index);

module.exports = router;
