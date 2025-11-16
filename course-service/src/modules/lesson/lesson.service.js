const LessonRepository = require('./lesson.repository');

class LessonService {
    async getAllForGroup(id) {
        return LessonRepository.findAllByGroup(id);
    }

    async getOne(id) {
        const zajecia = await LessonRepository.findOne(id);
        if (!zajecia) throw new Error("Zajęcia nie znalezione");
        return zajecia;
    }

    async create(data) {
        return LessonRepository.create(data);
    }

    async update(id, data) {
        return LessonRepository.update(id, data);
    }

    async delete(id) {
        return LessonRepository.delete(id);
    }
}

module.exports = new LessonService();
