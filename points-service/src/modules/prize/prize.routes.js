const express = require('express');
const router = express.Router();
const PrizeController = require('./prize.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', PrizeController.getAll);
router.get('/:id', PrizeController.getOne);
router.post('/', PrizeController.create);
router.put('/:id', PrizeController.update);
router.delete('/:id', PrizeController.delete);
router.get('/uczen/:studentId', PrizeController.getStudentPrizes);
router.post('/redeem', PrizeController.redeemPrize);
router.get('/history/all', PrizeController.getPrizeHistory);

module.exports = router;
