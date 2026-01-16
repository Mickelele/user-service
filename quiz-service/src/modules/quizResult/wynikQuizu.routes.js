const express = require('express');
const router = express.Router();
const WynikQuizuController = require('./wynikQuizu.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, WynikQuizuController.getAll);
router.get('/uczen/:studentId', authMiddleware, checkRole(['opiekun', 'uczen']), checkOwnership('studentId'), WynikQuizuController.getByStudent);
router.get('/quiz/:quizId', authMiddleware, WynikQuizuController.getByQuiz);
router.get('/:id', authMiddleware, WynikQuizuController.getOne);
router.post('/', authMiddleware, checkRole(['uczen']), WynikQuizuController.create);
router.put('/:id', authMiddleware, WynikQuizuController.update);
router.delete('/:id', authMiddleware, WynikQuizuController.delete);

module.exports = router;
