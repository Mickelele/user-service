const WynikQuizuService = require('./wynikQuizu.service');

class WynikQuizuController {
    async getAll(req, res) {
        try {
            const wyniki = await WynikQuizuService.getAll();
            res.json(wyniki);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const wynik = await WynikQuizuService.getOne(req.params.id);
            res.json(wynik);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getByStudent(req, res) {
        try {
            const wyniki = await WynikQuizuService.getByStudent(req.params.studentId);
            res.json(wyniki);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByQuiz(req, res) {
        try {
            const wyniki = await WynikQuizuService.getByQuiz(req.params.quizId);
            res.json(wyniki);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const wynik = await WynikQuizuService.create(req.body);
            res.status(201).json(wynik);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const wynik = await WynikQuizuService.update(req.params.id, req.body);
            res.json(wynik);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await WynikQuizuService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = new WynikQuizuController();
