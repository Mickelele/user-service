const express = require('express');
const router = express.Router();
const SubstituteController = require('./substitute.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/available', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.getAvailable);
router.get('/teacher/:teacherId/reporting', authMiddleware, checkRole(['administrator', 'nauczyciel']), checkOwnership('teacherId'), SubstituteController.getByTeacherReporting);
router.get('/teacher/:teacherId/substituting', authMiddleware, checkRole(['administrator', 'nauczyciel']), checkOwnership('teacherId'), SubstituteController.getByTeacherSubstituting);

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.delete);

router.patch('/:id/assign', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.assignTeacher);
router.patch('/:id/unassign', authMiddleware, checkRole(['administrator', 'nauczyciel']), SubstituteController.unassignTeacher);

module.exports = router;
