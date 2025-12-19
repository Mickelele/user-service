const HomeworkRepository = require('./zadanieDomowe.repository');

class HomeworkService {
    async addHomework(data) {
        if (!data.id_grupy) {
            throw new Error("Brak id_grupy");
        }
        return await HomeworkRepository.createHomework(data);
    }

    async getHomeworkForGroup(id_grupy, id_ucznia) {
        return await HomeworkRepository.getHomeworkByGroupId(id_grupy, id_ucznia);
    }


}

module.exports = new HomeworkService();
