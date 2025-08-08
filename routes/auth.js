const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated Route
router.get('/profile', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);


module.exports = router;