const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/:id', userController.getUser);

module.exports = router;