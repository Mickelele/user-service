const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const SalaController = require('./room.controller');

router.get('/', SalaController.getAll);
router.get('/:id', authMiddleware, checkRole(['uczen']), SalaController.getOne);
router.post('/dodaj', SalaController.create);
router.put('/:id', SalaController.update);
router.delete('/:id', SalaController.delete);

module.exports = router;
