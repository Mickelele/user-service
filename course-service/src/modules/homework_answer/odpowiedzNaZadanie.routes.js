const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/dodaj', authMiddleware, HomeworkAnswerController.create);

module.exports = router;
