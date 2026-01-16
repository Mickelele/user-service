const express = require('express');
const router = express.Router();
const QuestionController = require('./question.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, QuestionController.getAll);
router.get('/test', QuestionController.test);
router.get('/quiz/:quizId', authMiddleware, checkRole(['opiekun', 'uczen']), QuestionController.getByQuiz);
router.get('/:id', authMiddleware, QuestionController.getOne);
router.post('/', authMiddleware, QuestionController.create);
router.put('/:id', authMiddleware, QuestionController.update);
router.delete('/:id', authMiddleware, QuestionController.delete);

module.exports = router;
