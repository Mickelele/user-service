const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const ReservationController = require('./reservation.controller');

router.get('/', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.getOne);
router.post('/dodaj', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.create);
router.put('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.update);
router.delete('/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.delete);
router.get('/sala/:id_sali', authMiddleware, checkRole(['administrator', 'nauczyciel']), ReservationController.getForSala);

module.exports = router;
