const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), HomeworkAnswerController.getAll);

router.post('/dodaj', authMiddleware, checkRole(['uczen']), HomeworkAnswerController.create);
router.get('/moja-odpowiedz/:id_zadania', authMiddleware, checkRole(['uczen']), HomeworkAnswerController.getStudentAnswer);

router.get('/zadanie/:id_zadania', authMiddleware, checkRole(['administrator', 'nauczyciel']), HomeworkAnswerController.getAnswers);
router.put('/ocen/:id_odpowiedzi', authMiddleware, checkRole(['administrator', 'nauczyciel']), HomeworkAnswerController.gradeAnswer);

router.get('/moje-prace', authMiddleware, checkRole(['uczen']), HomeworkAnswerController.getMyHomeworks);
router.get('/opiekun/:id_opiekuna/praceUcznia', authMiddleware, checkRole(['opiekun', 'administrator']), HomeworkAnswerController.getHomeworksByGuardian);

module.exports = router;