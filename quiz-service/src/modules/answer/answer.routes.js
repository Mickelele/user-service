const express = require('express');
const router = express.Router();
const AnswerController = require('./answer.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, AnswerController.getAll);
router.get('/pytanie/:questionId', authMiddleware, checkRole(['uczen']), AnswerController.getByQuestion);
router.get('/:id', authMiddleware, AnswerController.getOne);
router.post('/', authMiddleware, AnswerController.create);
router.put('/:id', authMiddleware, AnswerController.update);
router.delete('/:id', authMiddleware, AnswerController.delete);

module.exports = router;
