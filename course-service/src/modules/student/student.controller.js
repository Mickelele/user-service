const UczenService = require('./student.service');

const UczenController = {
    async getAll(req, res) {
        try {
            const uczniowie = await UczenService.getAll();
            res.json(uczniowie);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const uczen = await UczenService.getOne(req.params.id);
            res.json(uczen);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const nowy = await UczenService.create(req.body);
            res.status(201).json(nowy);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await UczenService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await UczenService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async assignToGroup(req, res) {
        try {
            const result = await UczenService.assignToGroup(req.body);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }


};

module.exports = UczenController;
