const express = require('express');
const router = express.Router();
const CourseController = require('./course.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getOne);
router.post('/dodajKurs', authMiddleware, checkRole(['administrator']), CourseController.create);
router.put('/aktualizujKurs/:id', authMiddleware, checkRole(['administrator']), CourseController.update);
router.delete('/usunKurs/:id', authMiddleware, checkRole(['administrator']), CourseController.delete);
router.get('/:id/grupy', CourseController.findGroupsByCourseId);


router.get('/nauczyciel/moje-kursy', authMiddleware, checkRole(['administrator', 'nauczyciel']), CourseController.getMyCourses);

module.exports = router;
