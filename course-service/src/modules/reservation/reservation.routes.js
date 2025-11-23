const express = require('express');
const router = express.Router();

const ReservationController = require('./reservation.controller');

router.get('/', ReservationController.getAll);
router.get('/:id', ReservationController.getOne);
router.post('/dodaj', ReservationController.create);
router.put('/:id', ReservationController.update);
router.delete('/:id', ReservationController.delete);
router.get('/sala/:id_sali', ReservationController.getForSala);

module.exports = router;
