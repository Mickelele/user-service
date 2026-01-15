const express = require('express');
const router = express.Router();
const AdminController = require('./admin.controller');

router.get('/', AdminController.getAll);
router.get('/:id', AdminController.getOne);
router.post('/', AdminController.create);
router.put('/:id', AdminController.update);
router.delete('/:id', AdminController.delete);

module.exports = router;
