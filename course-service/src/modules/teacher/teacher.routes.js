const express = require('express');
const router = express.Router();
const TeacherController = require('./teacher.controller');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', TeacherController.getAll);
router.get('/:id', TeacherController.getOne);
router.post('/dodajGrupe', TeacherController.create);
router.put('/aktualizujGrupe/:id', TeacherController.update);
router.delete('/usunGrupe/:id', TeacherController.delete);

module.exports = router;
