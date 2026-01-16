const express = require('express');
const router = express.Router();
const AdminController = require('./admin.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator']), AdminController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator']), AdminController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), AdminController.create);
router.put('/:id', authMiddleware, checkRole(['administrator']), AdminController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), AdminController.delete);

module.exports = router;
