const express = require('express');
const router = express.Router();
const { getUsers, createUser , login } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', login);

module.exports = router;
