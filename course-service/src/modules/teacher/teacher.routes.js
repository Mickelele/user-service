const express = require('express');
const router = express.Router();
const GroupController = require('./teacher.controller');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getOne);
router.post('/dodajGrupe', GroupController.create);
router.put('/aktualizujGrupe/:id', GroupController.update);
router.delete('/usunGrupe/:id', GroupController.delete);

module.exports = router;
