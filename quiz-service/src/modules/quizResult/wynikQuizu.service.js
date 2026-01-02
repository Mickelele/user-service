const WynikQuizuRepository = require('./wynikQuizu.repository');

class WynikQuizuService {
    async getAll() {
        return await WynikQuizuRepository.findAll();
    }

    async getOne(id) {
        const wynik = await WynikQuizuRepository.findById(id);
        if (!wynik) throw new Error('Wynik quizu nie znaleziony');
        return wynik;
    }

    async getByStudent(studentId) {
        return await WynikQuizuRepository.findByStudent(studentId);
    }

    async getByQuiz(quizId) {
        return await WynikQuizuRepository.findByQuiz(quizId);
    }

    async create(data) {
        if (!data.Uczen_id_ucznia || !data.Quiz_id_quizu) {
            throw new Error('ID ucznia i ID quizu są wymagane');
        }
        if (data.wynik === undefined || data.wynik === null) {
            throw new Error('Wynik jest wymagany');
        }
        if (!data.data_uzyskania) {
            data.data_uzyskania = new Date();
        }
        return await WynikQuizuRepository.create(data);
    }

    async update(id, data) {
        return await WynikQuizuRepository.update(id, data);
    }

    async delete(id) {
        return await WynikQuizuRepository.delete(id);
    }
}

module.exports = new WynikQuizuService();
