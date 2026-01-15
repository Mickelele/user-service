const express = require('express');
const router = express.Router();
const OpiekunController = require('./guardian.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator']), OpiekunController.getAll);
router.get('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), OpiekunController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), OpiekunController.create);
router.put('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), OpiekunController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), OpiekunController.delete);
router.get('/:id/uczniowie', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), OpiekunController.getStudentsWithUserInfo);

module.exports = router;
