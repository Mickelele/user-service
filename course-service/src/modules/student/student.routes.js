const express = require('express');
const router = express.Router();
const UczenController = require('./student.controller');

router.get('/', UczenController.getAll);
router.get('/:id', UczenController.getOne);
router.post('/', UczenController.create);
router.put('/:id', UczenController.update);
router.delete('/:id', UczenController.delete);

module.exports = router;
