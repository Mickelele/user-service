const express = require('express');
const router = express.Router();
const TeacherController = require('./teacher.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', TeacherController.getAll);
router.get('/:id', authMiddleware, checkRole(['opiekun']), TeacherController.getOne);
router.post('/', TeacherController.create);
router.put('/:id', TeacherController.update);
router.delete('/:id', TeacherController.delete);

module.exports = router;
