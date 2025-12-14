const QuizRepository = require('./quiz.repository');

class QuizService {
    async getAll() {
        return await QuizRepository.findAll();
    }

    async getOne(id) {
        const quiz = await QuizRepository.findById(id);
        if (!quiz) throw new Error('Quiz nie znaleziony');
        return quiz;
    }

    async getByLesson(lessonId) {
        return await QuizRepository.findByLesson(lessonId);
    }

    async create(data) {
        return await QuizRepository.create(data);
    }

    async update(id, data) {
        return await QuizRepository.update(id, data);
    }

    async delete(id) {
        return await QuizRepository.delete(id);
    }
}

module.exports = new QuizService();
