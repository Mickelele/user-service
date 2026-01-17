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

    async getAllHomeworkForGroupWithStatus(id_grupy, id_ucznia) {
        return await HomeworkRepository.getAllHomeworkByGroupIdWithStatus(id_grupy, id_ucznia);
    }

    async updateHomework(id_zadania, data) {
        return await HomeworkRepository.updateHomework(id_zadania, data);
    }

    async deleteHomework(id_zadania) {
        return await HomeworkRepository.deleteHomework(id_zadania);
    }


}

module.exports = new HomeworkService();
