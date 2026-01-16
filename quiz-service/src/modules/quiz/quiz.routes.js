const express = require('express');
const router = express.Router();
const QuizController = require('./quiz.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['nauczyciel']), QuizController.getAll);
router.get('/zajecia/:lessonId', authMiddleware, checkRole(['nauczyciel']), QuizController.getByLesson);
router.get('/grupa/:groupId', authMiddleware, checkRole(['uczen', 'nauczyciel']), QuizController.getByGroup);
router.get('/:id', authMiddleware, checkRole(['opiekun', 'uczen', 'nauczyciel']), QuizController.getOne);
router.post('/', authMiddleware, checkRole(['nauczyciel']), QuizController.create);
router.put('/:id', authMiddleware, checkRole(['nauczyciel']), QuizController.update);
router.delete('/:id', authMiddleware, checkRole(['nauczyciel']), QuizController.delete);

module.exports = router;
