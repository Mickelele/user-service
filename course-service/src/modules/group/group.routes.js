const express = require('express');
const router = express.Router();
const GroupController = require('./group.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/test/test', GroupController.test);

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), GroupController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), GroupController.getOne);
router.get('/:id/uczniowie', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun']), GroupController.getStudents);
router.post('/dodajGrupe', authMiddleware, checkRole(['administrator']), GroupController.create);
router.put('/aktualizujGrupe/:id', authMiddleware, checkRole(['administrator']), GroupController.update);
router.delete('/usunGrupe/:id', authMiddleware, checkRole(['administrator']), GroupController.delete);
router.patch('/:id/adjust', GroupController.adjustStudentCount);
router.get('/:id/zadania', GroupController.getHomeworks);





module.exports = router;
