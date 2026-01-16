const express = require('express');
const router = express.Router();
const OpiekunController = require('./guardian.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/', OpiekunController.getAll);
router.get('/:id', OpiekunController.getOne);
router.post('/', OpiekunController.create);
router.put('/:id', OpiekunController.update);
router.delete('/:id', OpiekunController.delete);
router.get('/:id/uczniowie', authMiddleware, checkRole(['opiekun']), checkOwnership('id'), OpiekunController.getStudentsWithUserInfo);


module.exports = router;
