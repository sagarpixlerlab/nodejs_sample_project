const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { authenticate, authorize } = require('../middleware/auth');
const { roles } = require('../config/config');

router.get('/dashboard', authenticate, authorize(roles.PROVIDER), providerController.getDashboard);

module.exports = router;