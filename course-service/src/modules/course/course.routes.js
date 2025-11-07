const express = require('express');
const router = express.Router();
const CourseController = require('./course.controller');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getOne);
router.post('/dodajKurs', CourseController.create);
router.put('/aktualizujKurs/:id', CourseController.update);
router.delete('/usunKurs/:id', CourseController.delete);
router.get('/:id/grupy', CourseController.findGroupsByCourseId);


module.exports = router;
