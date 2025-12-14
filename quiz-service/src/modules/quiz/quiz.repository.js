const Quiz = require('./quiz.model');

class QuizRepository {
    async findAll() {
        return await Quiz.findAll({
            order: [['id_quizu', 'DESC']]
        });
    }

    async findById(id) {
        return await Quiz.findByPk(id);
    }

    async findByLesson(lessonId) {
        return await Quiz.findAll({
            where: { Zajecia_id_zajec: lessonId },
            order: [['id_quizu', 'DESC']]
        });
    }

    async create(data) {
        return await Quiz.create(data);
    }

    async update(id, data) {
        const quiz = await this.findById(id);
        if (!quiz) throw new Error('Quiz nie znaleziony');
        return await quiz.update(data);
    }

    async delete(id) {
        const quiz = await this.findById(id);
        if (!quiz) throw new Error('Quiz nie znaleziony');
        return await quiz.destroy();
    }
}

module.exports = new QuizRepository();
