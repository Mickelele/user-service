const express = require('express');
const router = express.Router();
const multer = require('multer');
const PrizeController = require('./prize.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.get('/test', PrizeController.test);
router.get('/history/all', authMiddleware, checkRole(['administrator']), PrizeController.getPrizeHistory);

router.get('/', authMiddleware, checkRole(['administrator', 'uczen']), PrizeController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'uczen']), PrizeController.getOne);
router.post('/', authMiddleware, checkRole(['administrator']), PrizeController.create);
router.put('/:id', PrizeController.update);
router.delete('/:id', PrizeController.delete);

router.post('/:id/zdjecie', upload.single('zdjecie'), PrizeController.uploadImage);
router.get('/:id/zdjecie', PrizeController.getImage);
router.delete('/:id/zdjecie', PrizeController.deleteImage);

router.get('/uczen/:studentId', authMiddleware, checkRole(['uczen']), PrizeController.getStudentPrizes);
router.post('/redeem', authMiddleware, checkRole(['uczen']), PrizeController.redeemPrize);

module.exports = router;
