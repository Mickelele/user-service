const CourseService = require('./course.service');

const CourseController = {
    async getAll(req, res) {
        try {
            const courses = await CourseService.getAll();
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const course = await CourseService.getOne(req.params.id);
            res.json(course);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newCourse = await CourseService.create(req.body);
            res.status(201).json(newCourse);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await CourseService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await CourseService.delete(req.params.id);
            res.json({ message: 'Usunięto kurs' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = CourseController;
