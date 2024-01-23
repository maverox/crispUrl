const express = require('express');
const router = express.Router();
const { handleRegisterUser, handleLoginUser } = require('../controllers/userController');



router.route('/').post(handleRegisterUser);
router.route('/login').post(handleLoginUser);




module.exports = router;