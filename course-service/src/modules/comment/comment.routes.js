const express = require('express');
const router = express.Router();
const UwagaController = require('./comment.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkGuardianStudent, checkTeacherStudent } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator']), UwagaController.getAll);
router.get('/student/:id_ucznia', authMiddleware, checkRole(['administrator', 'uczen', 'opiekun', 'nauczyciel']), checkGuardianStudent('id_ucznia'), checkTeacherStudent('id_ucznia'), UwagaController.getByStudentId);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), UwagaController.getOne);

router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), UwagaController.create);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), UwagaController.delete);

module.exports = router;
