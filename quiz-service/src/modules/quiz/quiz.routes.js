const express = require('express');
const router = express.Router();
const QuizController = require('./quiz.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuizController.getAll);
router.get('/zajecia/:lessonId', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuizController.getByLesson);
router.get('/grupa/:groupId', authMiddleware, checkRole(['administrator', 'uczen', 'nauczyciel']), QuizController.getByGroup);
router.get('/:id', authMiddleware, checkRole(['administrator', 'opiekun', 'uczen', 'nauczyciel']), QuizController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuizController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuizController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), QuizController.delete);

module.exports = router;
