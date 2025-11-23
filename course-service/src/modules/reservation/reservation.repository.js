const Rezerwacja = require('./reservation.model');
const Sala = require('../room/room.model');
const Nauczyciel = require('../course/teacher.model');

const ReservationRepository = {

    findAll() {
        return Rezerwacja.findAll({
            include: [
                { model: Sala, as: 'sala' },
                { model: Nauczyciel, as: 'nauczyciel' }
            ]
        });
    },

    findOne(id) {
        return Rezerwacja.findByPk(id, {
            include: [
                { model: Sala, as: 'sala' },
                { model: Nauczyciel, as: 'nauczyciel' }
            ]
        });
    },

    create(data) {
        return Rezerwacja.create(data);
    },

    async update(id, data) {
        const reservation = await Rezerwacja.findByPk(id);
        if (!reservation) throw new Error("Rezerwacja nie znaleziona");

        return reservation.update(data);
    },

    async delete(id) {
        const reservation = await Rezerwacja.findByPk(id);
        if (!reservation) throw new Error("Rezerwacja nie znaleziona");

        return reservation.destroy();
    },

    async findForSala(id_sali) {
        return Rezerwacja.findAll({
            where: { id_sali },
            include: [
                { model: Sala, as: 'sala' },
                { model: Nauczyciel, as: 'nauczyciel' }
            ]
        });
    }

};

module.exports = ReservationRepository;
