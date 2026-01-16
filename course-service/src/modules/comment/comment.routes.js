const express = require('express');
const router = express.Router();
const UwagaController = require('./comment.controller');
const auth = require('../middleware/authMiddleware');
const { checkRole, checkGuardianStudent } = require('../middleware/roleMiddleware');

router.get('/', UwagaController.getAll);
router.get('/student/:id_ucznia', auth, checkRole(['uczen', 'opiekun']), checkGuardianStudent('id_ucznia'), UwagaController.getByStudentId);
router.get('/:id', UwagaController.getOne);

router.post('/', UwagaController.create);
router.delete('/:id', UwagaController.delete);

module.exports = router;
