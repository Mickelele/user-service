const express = require('express');
const router = express.Router();
const SubstituteController = require('./substitute.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/available', authMiddleware, checkRole(['nauczyciel']), SubstituteController.getAvailable);
router.get('/teacher/:teacherId/reporting', authMiddleware, checkRole(['nauczyciel']), checkOwnership('teacherId'), SubstituteController.getByTeacherReporting);
router.get('/teacher/:teacherId/substituting', authMiddleware, checkRole(['nauczyciel']), checkOwnership('teacherId'), SubstituteController.getByTeacherSubstituting);

router.get('/', authMiddleware, checkRole(['nauczyciel']), SubstituteController.getAll);
router.get('/:id', authMiddleware, checkRole(['nauczyciel']), SubstituteController.getOne);
router.post('/', authMiddleware, checkRole(['nauczyciel']), SubstituteController.create);
router.put('/:id', authMiddleware, checkRole(['nauczyciel']), SubstituteController.update);
router.delete('/:id', authMiddleware, checkRole(['nauczyciel']), SubstituteController.delete);

router.patch('/:id/assign', authMiddleware, checkRole(['nauczyciel']), SubstituteController.assignTeacher);
router.patch('/:id/unassign', authMiddleware, checkRole(['nauczyciel']), SubstituteController.unassignTeacher);

module.exports = router;
