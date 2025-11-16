const PresenceService = require('./presence.service');

const PresenceController = {

    async getAllForLesson(req, res) {
        try {
            const entries = await PresenceService.getAllForLesson(req.params.lessonId);
            res.json(entries);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const entry = await PresenceService.getOne(req.params.id);
            res.json(entry);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newEntry = await PresenceService.create(req.body);
            res.json(newEntry);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await PresenceService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await PresenceService.delete(req.params.id);
            res.json({ message: "Usunięto obecność" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = PresenceController;
