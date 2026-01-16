const express = require('express');
const router = express.Router();
const UczenController = require('./student.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/', UczenController.getAll);
router.get('/:id', authMiddleware, checkRole(['uczen']), checkOwnership('id'), UczenController.getOne);


router.post('/', UczenController.create);

router.put('/:id', UczenController.update);

router.delete('/:id', UczenController.delete);

router.post('/zapiszNaGrupe', authMiddleware, UczenController.zapiszNaGrupe);
router.patch('/:uczenId/assign-guardian', authMiddleware, UczenController.assignGuardian);
router.patch('/:id/punkty', authMiddleware, UczenController.adjustPoints);

module.exports = router;
