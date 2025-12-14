const express = require('express');
const router = express.Router();
const QuestionController = require('./question.controller');
const authMiddleware = require('../../middleware/authMiddleware');

// Wszystkie pytania
router.get('/', authMiddleware, QuestionController.getAll);

// Pytania dla konkretnego quizu
router.get('/quiz/:quizId', authMiddleware, QuestionController.getByQuiz);

// Konkretne pytanie
router.get('/:id', authMiddleware, QuestionController.getOne);

// Utwórz pytanie
router.post('/', authMiddleware, QuestionController.create);

// Edytuj pytanie
router.put('/:id', authMiddleware, QuestionController.update);

// Usuń pytanie
router.delete('/:id', authMiddleware, QuestionController.delete);

module.exports = router;
