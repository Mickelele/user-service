const express = require('express');
const router = express.Router();
const StatusController = require('./status.controller');
const authMiddleware = require('../users/middleware/authMiddleware');


router.get('/rola-status', StatusController.getAllRolaStatus);
router.get('/rola-status/:id', StatusController.getRolaStatusById);
router.post('/rola-status', authMiddleware, StatusController.createRolaStatus);
router.put('/rola-status/:id', authMiddleware, StatusController.updateRolaStatus);
router.delete('/rola-status/:id', authMiddleware, StatusController.deleteRolaStatus);
router.get('/historia', StatusController.getAllHistoriaStatusow);
router.get('/historia/:id', StatusController.getHistoriaStatusowById);
router.get('/historia/user/:userId', StatusController.getHistoriaStatusowByUserId);
router.get('/current/user/:userId', StatusController.getCurrentStatusByUserId);
router.post('/historia', authMiddleware, StatusController.createHistoriaStatusow);
router.post('/historia/internal', StatusController.createHistoriaStatusow);
router.put('/historia/:id', authMiddleware, StatusController.updateHistoriaStatusow);
router.delete('/historia/:id', authMiddleware, StatusController.deleteHistoriaStatusow);

module.exports = router;
