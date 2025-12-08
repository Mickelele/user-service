const PointsService = require('./points.service');

class PointsController {
    async getAllStudents(req, res) {
        try {
            const students = await PointsService.getAllStudents();
            res.json(students);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getStudentById(req, res) {
        try {
            const student = await PointsService.getStudentById(req.params.id);
            res.json(student);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getStudentPoints(req, res) {
        try {
            const result = await PointsService.getStudentPoints(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async addPoints(req, res) {
        try {
            const { id_ucznia, punkty } = req.body;
            const student = await PointsService.addPoints(id_ucznia, punkty);
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async subtractPoints(req, res) {
        try {
            const { id_ucznia, punkty } = req.body;
            const student = await PointsService.subtractPoints(id_ucznia, punkty);
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async setPoints(req, res) {
        try {
            const { id_ucznia, punkty } = req.body;
            const student = await PointsService.setPoints(id_ucznia, punkty);
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateStudent(req, res) {
        try {
            const student = await PointsService.updateStudent(req.params.id, req.body);
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getRanking(req, res) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : null;
            const ranking = await PointsService.getRanking(limit);
            res.json(ranking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getRankingByGroup(req, res) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : null;
            const ranking = await PointsService.getRankingByGroup(req.params.groupId, limit);
            res.json(ranking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PointsController();
