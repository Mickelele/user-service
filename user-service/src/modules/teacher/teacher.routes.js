const express = require('express');
const router = express.Router();
const TeacherController = require('./teacher.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), TeacherController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), TeacherController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), TeacherController.create);
router.put('/:id', authMiddleware, checkRole(['administrator']), TeacherController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), TeacherController.delete);

module.exports = router;
