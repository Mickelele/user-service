const GroupRepository = require('./group.repository');
const LessonService = require('../lesson/lesson.service');

class GroupService {
    async getAll() {
        return await GroupRepository.findAll();
    }

    async getOne(id) {
        const course = await GroupRepository.findById(id);
        if (!course) throw new Error('Grupa nie znaleziona');
        return course;
    }

    async create(data) {
        const grupa = await GroupRepository.createCourse(data);
        if (grupa && data.Kurs_id_kursu) {
            await LessonService.createLessonsForGroup(grupa.id_grupa);
        }

        return grupa;
    }

    async update(id, data) {
        return await GroupRepository.updateCourse(id, data);
    }

    async delete(id) {
        return await GroupRepository.deleteCourse(id);
    }

    async getStudents(id) {
        return await GroupRepository.getStudents(id);
    }

    async adjustStudentCount(id, delta) {
        return await GroupRepository.adjustStudentCount(id, delta);
    }
}

module.exports = new GroupService();