const { login, signUp } = require('../controller/authController');
const { loginValidation, signUpValidation } = require('../middleWares/authValidation');

const router =require('express').Router();


router.post('/login',  login)

router.post('/signup', signUp)

module.exports=router;