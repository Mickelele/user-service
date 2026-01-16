const express = require('express');
const router = express.Router();
const LessonController = require('./lesson.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/technical-reports', LessonController.getTechnicalReports);
router.delete('/technical-reports/:id', LessonController.clearTechnicalReport);

router.get('/:groupId/zajecia', authMiddleware, checkRole(['opiekun']), LessonController.getAllForGroup);
router.post('/:groupId/zajecia/dodaj', LessonController.create);

router.post('/:groupId/zajecia/auto-create', LessonController.createLessonsForGroup);

router.get('/zajecia/:id', LessonController.getOne);
router.put('/zajecia/:id', LessonController.update);
router.delete('/zajecia/:id', LessonController.delete);

router.post('/teacher/:teacherId/lessons/month', LessonController.getLessonsForTeacherByMonth);

module.exports = router;