const express = require('express');
const router = express.Router();
const UczenController = require('./student.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun']), UczenController.getAll);
router.get('/:id', authMiddleware, checkOwnershipOrRole(['administrator', 'nauczyciel', 'opiekun'], 'id'), UczenController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), UczenController.create);
router.put('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), UczenController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator']), UczenController.delete);
router.post('/zapiszNaGrupe', authMiddleware, UczenController.zapiszNaGrupe);
router.patch('/:uczenId/assign-guardian', authMiddleware, checkRole(['administrator']), UczenController.assignGuardian);
router.patch('/:id/punkty', authMiddleware, checkRole(['administrator', 'nauczyciel']), UczenController.adjustPoints);

module.exports = router;
