const TeacherRepository = require('./teacher.repository');

class TeacherService {
    async getAll() {
        return await TeacherRepository.findAll();
    }

    async getOne(id) {
        const course = await TeacherRepository.findById(id);
        if (!course) throw new Error('Grupa nie znaleziona');
        return course;
    }

    async create(data) {
        return await TeacherRepository.createCourse(data);
    }

    async update(id, data) {
        return await TeacherRepository.updateCourse(id, data);
    }

    async delete(id) {
        return await TeacherRepository.deleteCourse(id);
    }
}

module.exports = new TeacherService();
