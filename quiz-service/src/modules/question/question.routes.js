const express = require('express');
const router = express.Router();
const QuestionController = require('./question.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuestionController.getAll);
router.get('/test', QuestionController.test);
router.get('/quiz/:quizId', authMiddleware, checkRole(['administrator', 'opiekun', 'uczen', 'nauczyciel']), QuestionController.getByQuiz);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuestionController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuestionController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuestionController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuestionController.delete);

module.exports = router;
