const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkTeacherStudent } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator']), HomeworkAnswerController.getAll);

router.post('/dodaj', authMiddleware, checkRole(['administrator', 'uczen']), HomeworkAnswerController.create);
router.get('/moja-odpowiedz/:id_zadania', authMiddleware, checkRole(['administrator', 'uczen']), HomeworkAnswerController.getStudentAnswer);

router.get('/zadanie/:id_zadania', authMiddleware, checkRole(['administrator', 'opiekun', 'nauczyciel']), HomeworkAnswerController.getAnswers);
router.put('/ocen/:id_odpowiedzi', authMiddleware, checkRole(['administrator', 'nauczyciel']), HomeworkAnswerController.gradeAnswer);

router.get('/moje-prace', authMiddleware, checkRole(['administrator', 'uczen']), HomeworkAnswerController.getMyHomeworks);
router.get('/opiekun/:id_opiekuna/praceUcznia', authMiddleware, checkRole(['administrator', 'opiekun']), HomeworkAnswerController.getHomeworksByGuardian);

module.exports = router;