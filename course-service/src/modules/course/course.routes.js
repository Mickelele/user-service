const express = require('express');
const router = express.Router();
const CourseController = require('./course.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', CourseController.getAll);
router.get('/:id', authMiddleware, checkRole(['nauczyciel']), CourseController.getOne);
router.post('/dodajKurs', CourseController.create);
router.put('/aktualizujKurs/:id', CourseController.update);
router.delete('/usunKurs/:id', CourseController.delete);
router.get('/:id/grupy', CourseController.findGroupsByCourseId);


router.get('/nauczyciel/moje-kursy', authMiddleware, checkRole(['nauczyciel']), CourseController.getMyCourses);

module.exports = router;
