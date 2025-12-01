const GroupService = require('./group.service');

const GroupController = {
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
    },

    async getStudents(req, res) {
        try {
            const uczniowie = await GroupService.getStudents(req.params.id);
            res.json(uczniowie);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async adjustStudentCount(req, res) {
        try {
            const delta = parseInt(req.body.delta);
            if (isNaN(delta)) throw new Error('Delta musi być liczbą');

            const updatedGroup = await GroupService.adjustStudentCount(req.params.id, delta);
            res.json(updatedGroup);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


        async test(req, res) {
        try {
            return res.status(200).json({
                message: "Operacja zakończona sukcesem",
                status: "OK"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Wystąpił błąd serwera",
                error: error.message
            });
        }
    },
    async getHomeworks(req, res) {
        try {
            const zadania = await GroupService.getHomeworks(req.params.id);
            res.json(zadania);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }




};

module.exports = GroupController;
