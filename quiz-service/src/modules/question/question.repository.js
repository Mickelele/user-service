const Pytanie = require('./question.model');

class QuestionRepository {
    async findAll() {
        return await Pytanie.findAll({
            order: [['id_pytania', 'ASC']]
        });
    }

    async findById(id) {
        return await Pytanie.findByPk(id);
    }

    async findByQuiz(quizId) {
        return await Pytanie.findAll({
            where: { id_quizu: quizId },
            order: [['id_pytania', 'ASC']]
        });
    }

    async create(data) {
        return await Pytanie.create(data);
    }

    async update(id, data) {
        const pytanie = await this.findById(id);
        if (!pytanie) throw new Error('Pytanie nie znalezione');
        return await pytanie.update(data);
    }

    async delete(id) {
        const pytanie = await this.findById(id);
        if (!pytanie) throw new Error('Pytanie nie znalezione');
        return await pytanie.destroy();
    }
}

module.exports = new QuestionRepository();
