const express = require('express');
const router = express.Router();
const GroupController = require('./group.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/test/test', GroupController.test);

router.get('/', GroupController.getAll);
router.get('/:id', authMiddleware, checkRole(['opiekun', 'uczen']), GroupController.getOne);
router.get('/:id/uczniowie', GroupController.getStudents);
router.post('/dodajGrupe', GroupController.create);
router.put('/aktualizujGrupe/:id', GroupController.update);
router.delete('/usunGrupe/:id', GroupController.delete);
router.patch('/:id/adjust', GroupController.adjustStudentCount);
router.get('/:id/zadania', GroupController.getHomeworks);





module.exports = router;
