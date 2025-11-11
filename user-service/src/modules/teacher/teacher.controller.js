const TeacherService = require('./teacher.service');

const TeacherController = {
    async getAll(req, res) {
        try {
            const nauczyciele = await TeacherService.getAll();
            res.json(nauczyciele);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const nauczyciel = await TeacherService.getOne(req.params.id);
            res.json(nauczyciel);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const nowy = await TeacherService.create(req.body);
            res.status(201).json(nowy);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await TeacherService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await TeacherService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = TeacherController;
