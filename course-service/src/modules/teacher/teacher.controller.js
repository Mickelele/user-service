const GroupService = require('./teacher.service');

const TeacherController = {
    async getAll(req, res) {
        try {
            const courses = await GroupService.getAll();
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const course = await GroupService.getOne(req.params.id);
            res.json(course);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newCourse = await GroupService.create(req.body);
            res.status(201).json(newCourse);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await GroupService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await GroupService.delete(req.params.id);
            res.json({ message: 'Usunięto grupe' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = TeacherController;
