const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
