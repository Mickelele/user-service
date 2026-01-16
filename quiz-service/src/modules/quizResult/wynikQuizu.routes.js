const express = require('express');
const router = express.Router();
const WynikQuizuController = require('./wynikQuizu.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkGuardianStudent, checkTeacherStudent } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.getAll);
router.get('/uczen/:studentId', authMiddleware, checkRole(['administrator', 'opiekun', 'uczen', 'nauczyciel']), checkGuardianStudent('studentId'), checkTeacherStudent('studentId'), WynikQuizuController.getByStudent);
router.get('/quiz/:quizId', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.getByQuiz);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), WynikQuizuController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'uczen']), WynikQuizuController.create);
router.put('/:id', authMiddleware, checkRole(['administrator']), WynikQuizuController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), WynikQuizuController.delete);

module.exports = router;
