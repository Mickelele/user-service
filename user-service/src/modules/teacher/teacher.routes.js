const express = require('express');
const router = express.Router();
const TeacherController = require('./teacher.controller');

router.get('/', TeacherController.getAll);
router.get('/:id', TeacherController.getOne);
router.post('/', TeacherController.create);
router.put('/:id', TeacherController.update);
router.delete('/:id', TeacherController.delete);

module.exports = router;
