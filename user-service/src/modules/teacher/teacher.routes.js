const express = require('express');
const router = express.Router();
const TeacherController = require('./teacher.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), TeacherController.getAll);
router.get('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), TeacherController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), TeacherController.create);
router.put('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), TeacherController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), TeacherController.delete);

module.exports = router;
