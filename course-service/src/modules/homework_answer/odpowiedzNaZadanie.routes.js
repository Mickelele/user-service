const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/dodaj', authMiddleware, HomeworkAnswerController.create);
router.get('/moja-odpowiedz/:id_zadania', authMiddleware, HomeworkAnswerController.getStudentAnswer);

router.get('/zadanie/:id_zadania', authMiddleware, HomeworkAnswerController.getAnswers);
router.put('/ocen/:id_odpowiedzi', authMiddleware, HomeworkAnswerController.gradeAnswer);

module.exports = router;