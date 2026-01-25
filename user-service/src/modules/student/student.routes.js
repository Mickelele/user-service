const express = require('express');
const router = express.Router();
const UczenController = require('./student.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), UczenController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'uczen', 'nauczyciel']), checkOwnership('id'), UczenController.getOne);


router.post('/', authMiddleware, checkRole(['administrator']), UczenController.create);

router.put('/:id', authMiddleware, checkRole(['administrator']), UczenController.update);

router.delete('/:id', authMiddleware, checkRole(['administrator']), UczenController.delete);

router.post('/zapiszNaGrupe', authMiddleware, checkRole(['administrator', 'opiekun']), UczenController.zapiszNaGrupe);
router.patch('/:uczenId/assign-guardian', authMiddleware, checkRole(['administrator']), UczenController.assignGuardian);
router.patch('/:id/punkty', authMiddleware, checkRole(['administrator', 'nauczyciel']), UczenController.adjustPoints);
router.patch('/:id/pseudonim', authMiddleware, checkRole(['administrator', 'uczen']), checkOwnership('id'), UczenController.changePseudonim);

module.exports = router;
