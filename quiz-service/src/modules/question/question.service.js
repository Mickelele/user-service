const QuestionRepository = require('./question.repository');

class QuestionService {
    async getAll() {
        return await QuestionRepository.findAll();
    }

    async getOne(id) {
        const question = await QuestionRepository.findById(id);
        if (!question) throw new Error('Pytanie nie znalezione');
        return question;
    }

    async getByQuiz(quizId) {
        return await QuestionRepository.findByQuiz(quizId);
    }

    async create(data) {
        return await QuestionRepository.create(data);
    }

    async update(id, data) {
        return await QuestionRepository.update(id, data);
    }

    async delete(id) {
        return await QuestionRepository.delete(id);
    }
}

module.exports = new QuestionService();
