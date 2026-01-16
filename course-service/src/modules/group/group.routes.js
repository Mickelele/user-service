const express = require('express');
const router = express.Router();
const GroupController = require('./group.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkTeacherGroup } = require('../middleware/roleMiddleware');

router.get('/test/test', GroupController.test);

router.get('/', GroupController.getAll);
router.get('/:id', authMiddleware, checkRole(['opiekun', 'uczen', 'nauczyciel', 'administrator']), checkTeacherGroup('id'), GroupController.getOne);
router.get('/:id/uczniowie', authMiddleware, checkRole(['nauczyciel', 'administrator']), checkTeacherGroup('id'), GroupController.getStudents);
router.post('/dodajGrupe', GroupController.create);
router.put('/aktualizujGrupe/:id', GroupController.update);
router.delete('/usunGrupe/:id', GroupController.delete);
router.patch('/:id/adjust', GroupController.adjustStudentCount);
router.get('/:id/zadania', authMiddleware, checkRole(['nauczyciel', 'administrator']), checkTeacherGroup('id'), GroupController.getHomeworks);





module.exports = router;
