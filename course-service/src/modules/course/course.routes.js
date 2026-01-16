const express = require('express');
const router = express.Router();
const CourseController = require('./course.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), CourseController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), CourseController.getOne);
router.post('/dodajKurs', authMiddleware, checkRole(['administrator']), CourseController.create);
router.put('/aktualizujKurs/:id', authMiddleware, checkRole(['administrator']), CourseController.update);
router.delete('/usunKurs/:id', authMiddleware, checkRole(['administrator']), CourseController.delete);
router.get('/:id/grupy', authMiddleware, checkRole(['administrator', 'nauczyciel']), CourseController.findGroupsByCourseId);


router.get('/nauczyciel/moje-kursy', authMiddleware, checkRole(['administrator', 'nauczyciel']), CourseController.getMyCourses);

module.exports = router;
