const ReservationService = require('./reservation.service');

const ReservationController = {

    async getAll(req, res) {
        try {
            res.json(await ReservationService.getAll());
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async getOne(req, res) {
        try {
            res.json(await ReservationService.getOne(req.params.id));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    },

    async create(req, res) {
        try {
            res.json(await ReservationService.create(req.body));
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async update(req, res) {
        try {
            res.json(await ReservationService.update(req.params.id, req.body));
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async delete(req, res) {
        try {
            await ReservationService.delete(req.params.id);
            res.json({ message: "Usunięto rezerwację" });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async getForSala(req, res) {
        try {
            const rezerwacje = await ReservationService.getForSala(req.params.id_sali);
            res.json(rezerwacje);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

};

module.exports = ReservationController;
