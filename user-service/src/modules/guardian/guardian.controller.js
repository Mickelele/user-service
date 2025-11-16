// src/modules/opiekun/opiekun.controller.js
const OpiekunService = require('./guardian.service');

const OpiekunController = {
    async getAll(req, res) {
        try {
            const opiekunowie = await OpiekunService.getAll();
            res.json(opiekunowie);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const opiekun = await OpiekunService.getOne(req.params.id);
            res.json(opiekun);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const nowy = await OpiekunService.create(req.body);
            res.status(201).json(nowy);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await OpiekunService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await OpiekunService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getStudents(req, res) {
        try {
            const uczniowie = await OpiekunService.getStudents(req.params.id);
            res.json(uczniowie);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }



};

module.exports = OpiekunController;
