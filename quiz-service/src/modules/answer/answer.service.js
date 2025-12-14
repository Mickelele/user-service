const AnswerRepository = require('./answer.repository');

class AnswerService {
    async getAll() {
        return await AnswerRepository.findAll();
    }

    async getOne(id) {
        const answer = await AnswerRepository.findById(id);
        if (!answer) throw new Error('Odpowiedź nie znaleziona');
        return answer;
    }

    async getByQuestion(questionId) {
        return await AnswerRepository.findByQuestion(questionId);
    }

    async create(data) {
        return await AnswerRepository.create(data);
    }

    async update(id, data) {
        return await AnswerRepository.update(id, data);
    }

    async delete(id) {
        return await AnswerRepository.delete(id);
    }
}

module.exports = new AnswerService();
