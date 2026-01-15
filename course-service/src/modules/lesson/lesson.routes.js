const express = require('express');
const router = express.Router();
const LessonController = require('./lesson.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/technical-reports', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.getTechnicalReports);
router.delete('/technical-reports/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.clearTechnicalReport);

router.get('/:groupId/zajecia', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), LessonController.getAllForGroup);
router.post('/:groupId/zajecia/dodaj', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.create);

router.post('/:groupId/zajecia/auto-create', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.createLessonsForGroup);

router.get('/zajecia/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), LessonController.getOne);
router.put('/zajecia/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.update);
router.delete('/zajecia/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.delete);

router.post('/teacher/:teacherId/lessons/month', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.getLessonsForTeacherByMonth);

module.exports = router;