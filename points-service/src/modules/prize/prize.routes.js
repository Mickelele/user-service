const express = require('express');
const router = express.Router();
const multer = require('multer');
const PrizeController = require('./prize.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../../middleware/roleMiddleware');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.get('/test', PrizeController.test);
router.get('/history/all', authMiddleware, checkRole(['administrator', 'nauczyciel']), PrizeController.getPrizeHistory);

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), PrizeController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), PrizeController.getOne);
router.post('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), PrizeController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PrizeController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PrizeController.delete);

router.post('/:id/zdjecie', authMiddleware, checkRole(['administrator', 'nauczyciel']), upload.single('zdjecie'), PrizeController.uploadImage);
router.get('/:id/zdjecie', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), PrizeController.getImage);
router.delete('/:id/zdjecie', authMiddleware, checkRole(['administrator', 'nauczyciel']), PrizeController.deleteImage);

router.get('/uczen/:studentId', authMiddleware, checkOwnershipOrRole(['administrator', 'nauczyciel', 'opiekun'], 'studentId'), PrizeController.getStudentPrizes);
router.post('/redeem', authMiddleware, checkRole(['uczen']), PrizeController.redeemPrize);

module.exports = router;
