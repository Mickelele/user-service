const express = require('express');
const router = express.Router();
const LessonController = require('./lesson.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/technical-reports', authMiddleware, checkRole(['administrator']), LessonController.getTechnicalReports);
router.delete('/technical-reports/:id', authMiddleware, checkRole(['administrator']), LessonController.clearTechnicalReport);

router.get('/:groupId/zajecia', LessonController.getAllForGroup);
router.post('/:groupId/zajecia/dodaj', authMiddleware, checkRole(['administrator']), LessonController.create);
router.patch('/:groupId/zajecia/update-room', authMiddleware, checkRole(['administrator']), LessonController.updateRoomForGroup);

router.post('/:groupId/zajecia/auto-create', authMiddleware, checkRole(['administrator']), LessonController.createLessonsForGroup);

router.get('/zajecia/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), LessonController.getOne);
router.put('/zajecia/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), LessonController.update);
router.delete('/zajecia/:id', authMiddleware, checkRole(['administrator']), LessonController.delete);

router.post('/teacher/:teacherId/lessons/month', authMiddleware, checkRole(['administrator', 'nauczyciel']), checkOwnership('teacherId'), LessonController.getLessonsForTeacherByMonth);

module.exports = router;