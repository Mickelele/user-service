const express = require('express');
const router = express.Router();
const OpiekunController = require('./guardian.controller');

router.get('/', OpiekunController.getAll);
router.get('/:id', OpiekunController.getOne);
router.post('/', OpiekunController.create);
router.put('/:id', OpiekunController.update);
router.delete('/:id', OpiekunController.delete);
router.get('/:id/uczniowie', OpiekunController.getStudentsWithUserInfo);


module.exports = router;
