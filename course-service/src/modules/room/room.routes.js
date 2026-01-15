const express = require('express');
const router = express.Router();

const SalaController = require('./room.controller');

router.get('/', SalaController.getAll);
router.get('/:id', SalaController.getOne);
router.post('/dodaj', SalaController.create);
router.put('/:id', SalaController.update);
router.delete('/:id', SalaController.delete);

module.exports = router;
