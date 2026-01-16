const express = require('express');
const router = express.Router();
const OpiekunController = require('./guardian.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), OpiekunController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), OpiekunController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), OpiekunController.create);
router.put('/:id', authMiddleware, checkRole(['administrator']), OpiekunController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), OpiekunController.delete);
router.get('/:id/uczniowie', authMiddleware, checkRole(['administrator', 'opiekun']), checkOwnership('id'), OpiekunController.getStudentsWithUserInfo);


module.exports = router;
