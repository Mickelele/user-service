const SalaService = require('./room.service');

const SalaController = {

    async getAll(req, res) {
        try {
            res.json(await SalaService.getAll());
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async getOne(req, res) {
        try {
            res.json(await SalaService.getOne(req.params.id));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    },

    async create(req, res) {
        try {
            res.json(await SalaService.create(req.body));
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async update(req, res) {
        try {
            res.json(await SalaService.update(req.params.id, req.body));
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    async delete(req, res) {
        try {
            await SalaService.delete(req.params.id);
            res.json({ message: "Usunięto salę" });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
};

module.exports = SalaController;
