const express = require('express');
const router = express.Router();
const QuestionController = require('./question.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware, QuestionController.getAll);
router.get('/test', QuestionController.test);
router.get('/quiz/:quizId', authMiddleware, QuestionController.getByQuiz);
router.get('/:id', authMiddleware, QuestionController.getOne);
router.post('/', authMiddleware, QuestionController.create);
router.put('/:id', authMiddleware, QuestionController.update);
router.delete('/:id', authMiddleware, QuestionController.delete);

module.exports = router;
