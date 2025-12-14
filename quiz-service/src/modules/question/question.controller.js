const QuestionService = require('./question.service');

class QuestionController {
    async getAll(req, res) {
        try {
            const questions = await QuestionService.getAll();
            res.json(questions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const question = await QuestionService.getOne(req.params.id);
            res.json(question);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getByQuiz(req, res) {
        try {
            const questions = await QuestionService.getByQuiz(req.params.quizId);
            res.json(questions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const question = await QuestionService.create(req.body);
            res.status(201).json(question);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const question = await QuestionService.update(req.params.id, req.body);
            res.json(question);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await QuestionService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = new QuestionController();
