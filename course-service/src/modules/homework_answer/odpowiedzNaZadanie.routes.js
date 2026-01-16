const express = require('express');
const router = express.Router();
const HomeworkAnswerController = require('./odpowiedzNaZadanie.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkTeacherStudent } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, HomeworkAnswerController.getAll);

router.post('/dodaj', authMiddleware, checkRole(['uczen']), HomeworkAnswerController.create);
router.get('/moja-odpowiedz/:id_zadania', authMiddleware, HomeworkAnswerController.getStudentAnswer);

router.get('/zadanie/:id_zadania', authMiddleware, checkRole(['opiekun', 'nauczyciel']), HomeworkAnswerController.getAnswers);
router.put('/ocen/:id_odpowiedzi', authMiddleware, checkRole(['nauczyciel']), HomeworkAnswerController.gradeAnswer);

router.get('/moje-prace', authMiddleware, HomeworkAnswerController.getMyHomeworks);
router.get('/opiekun/:id_opiekuna/praceUcznia', authMiddleware, checkRole(['opiekun']), HomeworkAnswerController.getHomeworksByGuardian);

module.exports = router;