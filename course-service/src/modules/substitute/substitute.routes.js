const express = require('express');
const router = express.Router();
const SubstituteController = require('./substitute.controller');

// Trasy specjalne (przed parametrycznymi)
router.get('/available', SubstituteController.getAvailable);
router.get('/teacher/:teacherId/reporting', SubstituteController.getByTeacherReporting);
router.get('/teacher/:teacherId/substituting', SubstituteController.getByTeacherSubstituting);

// CRUD podstawowy
router.get('/', SubstituteController.getAll);
router.get('/:id', SubstituteController.getOne);
router.post('/', SubstituteController.create);
router.put('/:id', SubstituteController.update);
router.delete('/:id', SubstituteController.delete);

// Przypisywanie nauczyciela
router.patch('/:id/assign', SubstituteController.assignTeacher);
router.patch('/:id/unassign', SubstituteController.unassignTeacher);

module.exports = router;
