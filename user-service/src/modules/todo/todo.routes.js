const express = require('express');
const router = express.Router();
const TodoController = require('./todo.controller');
const authMiddleware = require('../users/middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../middleware/roleMiddleware');

router.get('/task-status', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.getAllTaskStatuses);

router.get('/listy/uczen/:uczenId', authMiddleware, checkRole(['administrator', 'uczen']), checkOwnership('uczenId'), TodoController.getListyZadanByUczenId);
router.get('/listy/:listaId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.getListaZadanById);
router.post('/listy', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.createListaZadan);
router.put('/listy/:listaId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.updateListaZadan);
router.delete('/listy/:listaId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.deleteListaZadan);

router.get('/zadania/uczen/:uczenId', authMiddleware, checkRole(['administrator', 'uczen']), checkOwnership('uczenId'), TodoController.getZadaniaByUczenId);
router.get('/zadania/:zadanieId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.getZadanieById);
router.post('/zadania', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.createZadanie);
router.put('/zadania/:zadanieId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.updateZadanie);
router.delete('/zadania/:zadanieId', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.deleteZadanie);
router.patch('/zadania/:zadanieId/complete', authMiddleware, checkRole(['administrator', 'uczen']), TodoController.markZadanieAsCompleted);

module.exports = router;
