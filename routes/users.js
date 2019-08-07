var express = require('express');
var router = express.Router();

//session进行登陆控制
var checkNotLogin = require('../controllers/check').checkNotLogin;
var checkLogin = require('../controllers/check').checkLogin;

const user_controller = require('../controllers/user');

router.get('/login',checkNotLogin,user_controller.login_get);
router.post('/login',user_controller.login_post);

router.get('/sign',user_controller.sign_get);
router.post('/sign',user_controller.sign_post);

/* GET users listing. */


module.exports = router;
