const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, HomeworkAnswerController.getAll);

router.post('/dodaj', authMiddleware, HomeworkAnswerController.create);
router.get('/moja-odpowiedz/:id_zadania', authMiddleware, HomeworkAnswerController.getStudentAnswer);

router.get('/zadanie/:id_zadania', authMiddleware, HomeworkAnswerController.getAnswers);
router.put('/ocen/:id_odpowiedzi', authMiddleware, HomeworkAnswerController.gradeAnswer);

router.get('/moje-prace', authMiddleware, HomeworkAnswerController.getMyHomeworks);
router.get('/opiekun/:id_opiekuna/praceUcznia', authMiddleware, HomeworkAnswerController.getHomeworksByGuardian);

module.exports = router;