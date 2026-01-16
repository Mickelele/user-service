const express = require('express');
const router = express.Router();
const PointsController = require('./points.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.get('/uczniowie', PointsController.getAllStudents);
router.get('/uczen/:id', authMiddleware, checkRole(['uczen']), PointsController.getStudentById);
router.get('/uczen/:id/saldo', authMiddleware, checkRole(['uczen']), PointsController.getStudentPoints);
router.post('/add', PointsController.addPoints);
router.post('/subtract', PointsController.subtractPoints);
router.post('/set', PointsController.setPoints);
router.put('/uczen/:id', PointsController.updateStudent);
router.get('/ranking', PointsController.getRanking);
router.get('/ranking/grupa/:groupId', PointsController.getRankingByGroup);

module.exports = router;
