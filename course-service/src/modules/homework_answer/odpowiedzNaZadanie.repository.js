const OdpowiedzNaZadanie = require('./odpowiedzNaZadanie.model');

const HomeworkAnswerRepository = {
    async createAnswer(data) {
        return await OdpowiedzNaZadanie.create(data);
    },


    async getAnswersByHomeworkId(id_zadania) {
        return await OdpowiedzNaZadanie.findAll({
            where: { id_zadania },
            order: [['id_odpowiedzi', 'DESC']]
        });
    },


    async gradeAnswer(id_odpowiedzi, ocena) {
        const odpowiedz = await OdpowiedzNaZadanie.findByPk(id_odpowiedzi);
        if (!odpowiedz) {
            throw new Error('Odpowiedź nie znaleziona');
        }

        odpowiedz.ocena = ocena;
        await odpowiedz.save();
        return odpowiedz;
    },


    async getStudentAnswer(id_zadania, id_ucznia) {
        return await OdpowiedzNaZadanie.findOne({
            where: { id_zadania, id_ucznia }
        });
    }
};

module.exports = HomeworkAnswerRepository;