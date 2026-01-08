const AdminService = require('./admin.service');

const AdminController = {
    async getAll(req, res) {
        try {
            const admini = await AdminService.getAll();
            res.json(admini);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const admin = await AdminService.getOne(req.params.id);
            res.json(admin);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const nowy = await AdminService.create(req.body);
            res.status(201).json(nowy);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await AdminService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await AdminService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = AdminController;
