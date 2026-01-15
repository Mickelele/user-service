const express = require('express');
const router = express.Router();
const UwagaController = require('./comment.controller');
const auth = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', auth, checkRole(['administrator', 'nauczyciel']), UwagaController.getAll);
router.get('/student/:id_ucznia', auth, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), UwagaController.getByStudentId);
router.get('/:id', auth, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), UwagaController.getOne);

router.post('/', auth, checkRole(['administrator', 'nauczyciel']), UwagaController.create);
router.delete('/:id', auth, checkRole(['administrator', 'nauczyciel']), UwagaController.delete);

module.exports = router;
