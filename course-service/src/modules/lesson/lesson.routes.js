const express = require('express');
const router = express.Router();
const LessonController = require('./lesson.controller');

router.get('/:groupId/zajecia', LessonController.getAllForGroup);
router.post('/:groupId/zajecia/dodaj', LessonController.create);

router.post('/:groupId/zajecia/auto-create', LessonController.createLessonsForGroup);

router.get('/zajecia/:id', LessonController.getOne);
router.put('/zajecia/:id', LessonController.update);
router.delete('/zajecia/:id', LessonController.delete);

module.exports = router;