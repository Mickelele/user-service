const express = require('express');
const router = express.Router();
const AnswerController = require('./answer.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), AnswerController.getAll);
router.get('/pytanie/:questionId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), AnswerController.getByQuestion);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), AnswerController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), AnswerController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), AnswerController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), AnswerController.delete);

module.exports = router;
