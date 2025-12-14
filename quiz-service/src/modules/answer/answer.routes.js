const express = require('express');
const router = express.Router();
const AnswerController = require('./answer.controller');
const authMiddleware = require('../../middleware/authMiddleware');

// Wszystkie odpowiedzi
router.get('/', authMiddleware, AnswerController.getAll);

// Odpowiedzi dla konkretnego pytania
router.get('/pytanie/:questionId', authMiddleware, AnswerController.getByQuestion);

// Konkretna odpowiedź
router.get('/:id', authMiddleware, AnswerController.getOne);

// Utwórz odpowiedź
router.post('/', authMiddleware, AnswerController.create);

// Edytuj odpowiedź
router.put('/:id', authMiddleware, AnswerController.update);

// Usuń odpowiedź
router.delete('/:id', authMiddleware, AnswerController.delete);

module.exports = router;
