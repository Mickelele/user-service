const express = require('express');
const router = express.Router();
const CourseController = require('./course.controller');
const authMiddleware = require('../auth/middleware/authMiddleware');

router.get('/', authMiddleware, CourseController.getAll);
router.get('/:id', authMiddleware, CourseController.getOne);
router.post('/', authMiddleware, CourseController.create);
router.put('/:id', authMiddleware, CourseController.update);
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
