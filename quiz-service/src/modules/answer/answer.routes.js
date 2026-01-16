const express = require('express');
const router = express.Router();
const AnswerController = require('./answer.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['nauczyciel']), AnswerController.getAll);
router.get('/pytanie/:questionId', authMiddleware, checkRole(['uczen', 'nauczyciel']), AnswerController.getByQuestion);
router.get('/:id', authMiddleware, checkRole(['nauczyciel']), AnswerController.getOne);
router.post('/', authMiddleware, checkRole(['nauczyciel']), AnswerController.create);
router.put('/:id', authMiddleware, checkRole(['nauczyciel']), AnswerController.update);
router.delete('/:id', authMiddleware, checkRole(['nauczyciel']), AnswerController.delete);

module.exports = router;
