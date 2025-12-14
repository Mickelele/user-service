const Odpowiedz = require('./answer.model');

class AnswerRepository {
    async findAll() {
        return await Odpowiedz.findAll({
            order: [['id_odpowiedzi', 'ASC']]
        });
    }

    async findById(id) {
        return await Odpowiedz.findByPk(id);
    }

    async findByQuestion(questionId) {
        return await Odpowiedz.findAll({
            where: { id_pytania: questionId },
            order: [['id_odpowiedzi', 'ASC']]
        });
    }

    async create(data) {
        return await Odpowiedz.create(data);
    }

    async update(id, data) {
        const odpowiedz = await this.findById(id);
        if (!odpowiedz) throw new Error('Odpowiedź nie znaleziona');
        return await odpowiedz.update(data);
    }

    async delete(id) {
        const odpowiedz = await this.findById(id);
        if (!odpowiedz) throw new Error('Odpowiedź nie znaleziona');
        return await odpowiedz.destroy();
    }
}

module.exports = new AnswerRepository();
