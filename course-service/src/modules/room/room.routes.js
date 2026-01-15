const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const SalaController = require('./room.controller');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), SalaController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), SalaController.getOne);
router.post('/dodaj', authMiddleware, checkRole(['administrator']), SalaController.create);
router.put('/:id', authMiddleware, checkRole(['administrator']), SalaController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), SalaController.delete);

module.exports = router;
