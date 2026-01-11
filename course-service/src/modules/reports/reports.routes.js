const express = require('express');
const router = express.Router();
const ReportsController = require('./reports.controller');

router.get('/detailed', ReportsController.getDetailedReport);

module.exports = router;
