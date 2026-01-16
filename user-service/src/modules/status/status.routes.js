const express = require('express');
const router = express.Router();
const StatusController = require('./status.controller');
const authMiddleware = require('../users/middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.get('/rola-status', authMiddleware, checkRole(['administrator']), StatusController.getAllRolaStatus);
router.get('/rola-status/:id', authMiddleware, checkRole(['administrator']), StatusController.getRolaStatusById);
router.post('/rola-status', authMiddleware, checkRole(['administrator']), StatusController.createRolaStatus);
router.put('/rola-status/:id', authMiddleware, checkRole(['administrator']), StatusController.updateRolaStatus);
router.delete('/rola-status/:id', authMiddleware, checkRole(['administrator']), StatusController.deleteRolaStatus);
router.get('/historia', authMiddleware, checkRole(['administrator']), StatusController.getAllHistoriaStatusow);
router.get('/historia/:id', authMiddleware, checkRole(['administrator']), StatusController.getHistoriaStatusowById);
router.get('/historia/user/:userId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), StatusController.getHistoriaStatusowByUserId);
router.get('/current/user/:userId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), StatusController.getCurrentStatusByUserId);
router.post('/historia', authMiddleware, checkRole(['administrator']), StatusController.createHistoriaStatusow);
router.post('/historia/internal', StatusController.createHistoriaStatusow);
router.put('/historia/:id', authMiddleware, checkRole(['administrator']), StatusController.updateHistoriaStatusow);
router.delete('/historia/:id', authMiddleware, checkRole(['administrator']), StatusController.deleteHistoriaStatusow);

module.exports = router;
