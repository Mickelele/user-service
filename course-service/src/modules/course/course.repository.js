const Kurs = require('./course.model');

const CourseRepository = {
    async findAll() {
        return Kurs.findAll();
    },

    async findById(id) {
        return Kurs.findByPk(id);
    },

    async createCourse(data) {
        return Kurs.create(data);
    },

    async updateCourse(id, data) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Kurs nie znaleziony');
        return course.update(data);
    },

    async deleteCourse(id) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Kurs nie znaleziony');
        return course.destroy();
    }
};

module.exports = CourseRepository;
