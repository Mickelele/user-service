const express = require('express');
const router = express.Router();
const UczenController = require('./student.controller');
//const authMiddleware = require('../middleware/authMiddleware');

router.get('/', UczenController.getAll);
router.get('/:id', UczenController.getOne);


router.post('/', UczenController.create);

router.put('/:id', UczenController.update);

router.delete('/:id', UczenController.delete);

router.post('/zapiszNaGrupe', authMiddleware, UczenController.zapiszNaGrupe);



module.exports = router;
