const express = require('express');
const router = express.Router();
const WynikQuizuController = require('./wynikQuizu.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.getAll);
router.get('/uczen/:studentId', authMiddleware, checkOwnershipOrRole(['administrator', 'nauczyciel', 'opiekun'], 'studentId'), WynikQuizuController.getByStudent);
router.get('/quiz/:quizId', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.getByQuiz);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), WynikQuizuController.getOne);
router.post('/', authMiddleware, checkRole(['uczen']), WynikQuizuController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), WynikQuizuController.delete);

module.exports = router;
