const express = require('express');
const router = express.Router();
const TodoController = require('./todo.controller');
const authMiddleware = require('../users/middleware/authMiddleware');

router.get('/task-status', TodoController.getAllTaskStatuses);

router.get('/listy/uczen/:uczenId', authMiddleware, TodoController.getListyZadanByUczenId);
router.get('/listy/:listaId', authMiddleware, TodoController.getListaZadanById);
router.post('/listy', authMiddleware, TodoController.createListaZadan);
router.put('/listy/:listaId', authMiddleware, TodoController.updateListaZadan);
router.delete('/listy/:listaId', authMiddleware, TodoController.deleteListaZadan);

router.get('/zadania/uczen/:uczenId', authMiddleware, TodoController.getZadaniaByUczenId);
router.get('/zadania/:zadanieId', authMiddleware, TodoController.getZadanieById);
router.post('/zadania', authMiddleware, TodoController.createZadanie);
router.put('/zadania/:zadanieId', authMiddleware, TodoController.updateZadanie);
router.delete('/zadania/:zadanieId', authMiddleware, TodoController.deleteZadanie);
router.patch('/zadania/:zadanieId/complete', authMiddleware, TodoController.markZadanieAsCompleted);

module.exports = router;
