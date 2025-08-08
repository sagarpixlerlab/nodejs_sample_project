const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { roles } = require('../config/config');

router.get('/dashboard', authenticate, authorize(roles.ADMIN), adminController.getDashboard);
router.get('/users', authenticate, authorize(roles.ADMIN), adminController.getAllUsers);

module.exports = router;