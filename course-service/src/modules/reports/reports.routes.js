const express = require('express');
const router = express.Router();
const ReportsController = require('./reports.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/detailed', authMiddleware, checkRole(['uczen', 'nauczyciel']), ReportsController.getDetailedReport);

module.exports = router;
