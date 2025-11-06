const CourseRepository = require('./course.repository');

class CourseService {
    async getAll() {
        return await CourseRepository.findAll();
    }

    async getOne(id) {
        const course = await CourseRepository.findById(id);
        if (!course) throw new Error('Kurs nie znaleziony');
        return course;
    }

    async create(data) {
        return await CourseRepository.createCourse(data);
    }

    async update(id, data) {
        return await CourseRepository.updateCourse(id, data);
    }

    async delete(id) {
        return await CourseRepository.deleteCourse(id);
    }
}

module.exports = new CourseService();
