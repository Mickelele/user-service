const express = require('express');
const router = express.Router();
const QuizController = require('./quiz.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/', authMiddleware, QuizController.getAll);
router.get('/zajecia/:lessonId', authMiddleware, QuizController.getByLesson);
router.get('/grupa/:groupId', authMiddleware, checkRole(['uczen']), QuizController.getByGroup);
router.get('/:id', authMiddleware, checkRole(['opiekun', 'uczen']), QuizController.getOne);
router.post('/', authMiddleware, QuizController.create);
router.put('/:id', authMiddleware, QuizController.update);
router.delete('/:id', authMiddleware, QuizController.delete);

module.exports = router;
