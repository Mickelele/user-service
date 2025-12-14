const AnswerService = require('./answer.service');

class AnswerController {
    async getAll(req, res) {
        try {
            const answers = await AnswerService.getAll();
            res.json(answers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const answer = await AnswerService.getOne(req.params.id);
            res.json(answer);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getByQuestion(req, res) {
        try {
            const answers = await AnswerService.getByQuestion(req.params.questionId);
            res.json(answers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const answer = await AnswerService.create(req.body);
            res.status(201).json(answer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const answer = await AnswerService.update(req.params.id, req.body);
            res.json(answer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await AnswerService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = new AnswerController();
