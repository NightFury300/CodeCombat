const express = require('express');
const router = express.Router();
const { signup, login, googleLogin } = require('../controllers/authController');

router.post('/signup', signup);  // Sign up a new user
router.post('/login', login);  // Login user
router.post('/google', googleLogin);  // Google login

module.exports = router;
