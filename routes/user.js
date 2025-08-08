const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { roles } = require('../config/config');

router.get('/dashboard', authenticate, authorize(roles.USER), userController.getDashboard);

module.exports = router;