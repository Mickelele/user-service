const express = require('express');
const router = express.Router();
const PointsController = require('./points.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkOwnership } = require('../../middleware/roleMiddleware');

router.get('/uczniowie', authMiddleware, checkRole(['administrator']), PointsController.getAllStudents);
router.get('/uczen/:id', authMiddleware, checkRole(['administrator', 'uczen', 'nauczyciel']), checkOwnership('id'), PointsController.getStudentById);
router.get('/uczen/:id/saldo', authMiddleware, checkRole(['administrator', 'uczen', 'nauczyciel']), checkOwnership('id'), PointsController.getStudentPoints);
router.post('/add', authMiddleware, checkRole(['administrator']), PointsController.addPoints);
router.post('/subtract', authMiddleware, checkRole(['administrator']), PointsController.subtractPoints);
router.post('/set', authMiddleware, checkRole(['administrator']), PointsController.setPoints);
router.put('/uczen/:id', authMiddleware, checkRole(['administrator']), PointsController.updateStudent);
router.get('/ranking', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), PointsController.getRanking);
router.get('/ranking/grupa/:groupId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), PointsController.getRankingByGroup);

module.exports = router;
