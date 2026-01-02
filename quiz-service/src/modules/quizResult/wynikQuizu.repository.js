const WynikQuizu = require('./wynikQuizu.model');
const Quiz = require('../quiz/quiz.model');

class WynikQuizuRepository {
    async findAll() {
        require('../../models/associations');
        return await WynikQuizu.findAll({
            include: [{
                model: Quiz,
                as: 'quiz',
                attributes: ['id_quizu', 'nazwa', 'opis']
            }],
            order: [['data_uzyskania', 'DESC']]
        });
    }

    async findById(id) {
        require('../../models/associations');
        return await WynikQuizu.findByPk(id, {
            include: [{
                model: Quiz,
                as: 'quiz',
                attributes: ['id_quizu', 'nazwa', 'opis']
            }]
        });
    }

    async findByStudent(studentId) {
        require('../../models/associations');
        return await WynikQuizu.findAll({
            where: { Uczen_id_ucznia: studentId },
            include: [{
                model: Quiz,
                as: 'quiz',
                attributes: ['id_quizu', 'nazwa', 'opis']
            }],
            order: [['data_uzyskania', 'DESC']]
        });
    }

    async findByQuiz(quizId) {
        return await WynikQuizu.findAll({
            where: { Quiz_id_quizu: quizId },
            order: [['data_uzyskania', 'DESC']]
        });
    }

    async create(data) {
        return await WynikQuizu.create(data);
    }

    async update(id, data) {
        const wynik = await this.findById(id);
        if (!wynik) throw new Error('Wynik quizu nie znaleziony');
        return await wynik.update(data);
    }

    async delete(id) {
        const wynik = await this.findById(id);
        if (!wynik) throw new Error('Wynik quizu nie znaleziony');
        return await wynik.destroy();
    }
}

module.exports = new WynikQuizuRepository();
