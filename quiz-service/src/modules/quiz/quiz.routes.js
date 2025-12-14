const express = require('express');
const router = express.Router();
const QuizController = require('./quiz.controller');
const authMiddleware = require('../../middleware/authMiddleware');

// Wszystkie quizy
router.get('/', authMiddleware, QuizController.getAll);

// Quizy dla konkretnych zajęć
router.get('/zajecia/:lessonId', authMiddleware, QuizController.getByLesson);

// Konkretny quiz
router.get('/:id', authMiddleware, QuizController.getOne);

// Utwórz quiz
router.post('/', authMiddleware, QuizController.create);

// Edytuj quiz
router.put('/:id', authMiddleware, QuizController.update);

// Usuń quiz
router.delete('/:id', authMiddleware, QuizController.delete);

module.exports = router;
