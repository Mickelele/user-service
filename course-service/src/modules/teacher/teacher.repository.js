const Grupa = require('./teacher.model');

const TeacherRepository = {
    async findAll() {
        return Grupa.findAll();
    },

    async findById(id) {
        return Grupa.findByPk(id);
    },

    async createCourse(data) {
        return Grupa.create(data);
    },

    async updateCourse(id, data) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Grupa.update(data);
    },

    async deleteCourse(id) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Grupa.destroy();
    }
};

module.exports = TeacherRepository;
