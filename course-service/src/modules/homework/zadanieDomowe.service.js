const HomeworkRepository = require('./zadanieDomowe.repository');

class HomeworkService {
    async addHomework(data) {
        if (!data.id_grupy) {
            throw new Error("Brak id_grupy");
        }

        return await HomeworkRepository.createHomework(data);
    }
}

module.exports = new HomeworkService();
