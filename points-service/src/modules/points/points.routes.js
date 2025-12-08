const express = require('express');
const router = express.Router();
const PointsController = require('./points.controller');
const authMiddleware = require('../../middleware/authMiddleware');

// Pobierz wszystkich uczniów z punktami
router.get('/uczniowie', PointsController.getAllStudents);

// Pobierz ucznia po ID
router.get('/uczen/:id', PointsController.getStudentById);

// Pobierz saldo punktów ucznia
router.get('/uczen/:id/saldo', PointsController.getStudentPoints);

// Dodaj punkty uczniowi
router.post('/add', PointsController.addPoints);

// Odejmij punkty uczniowi
router.post('/subtract', PointsController.subtractPoints);

// Ustaw konkretną liczbę punktów
router.post('/set', PointsController.setPoints);

// Aktualizuj dane ucznia
router.put('/uczen/:id', PointsController.updateStudent);

// Ranking wszystkich uczniów (query param: ?limit=10)
router.get('/ranking', PointsController.getRanking);

// Ranking uczniów w konkretnej grupie (query param: ?limit=10)
router.get('/ranking/grupa/:groupId', PointsController.getRankingByGroup);

module.exports = router;
