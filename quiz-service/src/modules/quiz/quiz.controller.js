const QuizService = require('./quiz.service');

class QuizController {
    async getAll(req, res) {
        try {
            const quizzes = await QuizService.getAll();
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const quiz = await QuizService.getOne(req.params.id);
            res.json(quiz);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getByLesson(req, res) {
        try {
            const quizzes = await QuizService.getByLesson(req.params.lessonId);
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByGroup(req, res) {
        try {
            const quizzes = await QuizService.getByGroup(req.params.groupId);
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const quiz = await QuizService.create(req.body);
            res.status(201).json(quiz);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const quiz = await QuizService.update(req.params.id, req.body);
            res.json(quiz);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await QuizService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = new QuizController();
