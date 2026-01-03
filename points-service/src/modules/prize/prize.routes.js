const express = require('express');
const router = express.Router();
const multer = require('multer');
const PrizeController = require('./prize.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.get('/test', PrizeController.test);
router.get('/history/all', PrizeController.getPrizeHistory);

router.get('/', PrizeController.getAll);
router.get('/:id', PrizeController.getOne);
router.post('/', PrizeController.create);
router.put('/:id', PrizeController.update);
router.delete('/:id', PrizeController.delete);

router.post('/:id/zdjecie', upload.single('zdjecie'), PrizeController.uploadImage);
router.get('/:id/zdjecie', PrizeController.getImage);
router.delete('/:id/zdjecie', PrizeController.deleteImage);

router.get('/uczen/:studentId', PrizeController.getStudentPrizes);
router.post('/redeem', PrizeController.redeemPrize);

module.exports = router;
