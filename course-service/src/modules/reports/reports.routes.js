const express = require('express');
const router = express.Router();
const ReportsController = require('./reports.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/detailed', authMiddleware, ReportsController.getDetailedReport);

module.exports = router;
