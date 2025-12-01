const HomeworkAnswerRepository = require('./odpowiedzNaZadanie.repository');

class HomeworkAnswerService {
    async addAnswer({ id_ucznia, id_zadania, tresc }) {
        return await HomeworkAnswerRepository.createAnswer({
            id_ucznia,
            id_zadania,
            tresc
        });
    }
}

module.exports = new HomeworkAnswerService();
