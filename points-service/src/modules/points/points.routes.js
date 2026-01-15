const express = require('express');
const router = express.Router();
const PointsController = require('./points.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../../middleware/roleMiddleware');

router.get('/uczniowie', authMiddleware, checkRole(['administrator', 'nauczyciel']), PointsController.getAllStudents);
router.get('/uczen/:id', authMiddleware, checkOwnershipOrRole(['administrator', 'nauczyciel', 'opiekun'], 'id'), PointsController.getStudentById);
router.get('/uczen/:id/saldo', authMiddleware, checkOwnershipOrRole(['administrator', 'nauczyciel', 'opiekun'], 'id'), PointsController.getStudentPoints);
router.post('/add', authMiddleware, checkRole(['administrator', 'nauczyciel']), PointsController.addPoints);
router.post('/subtract', authMiddleware, checkRole(['administrator', 'nauczyciel']), PointsController.subtractPoints);
router.post('/set', authMiddleware, checkRole(['administrator', 'nauczyciel']), PointsController.setPoints);
router.put('/uczen/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PointsController.updateStudent);
router.get('/ranking', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), PointsController.getRanking);
router.get('/ranking/grupa/:groupId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen']), PointsController.getRankingByGroup);

module.exports = router;
