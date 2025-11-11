const Grupa = require('./group.model');
const Uczen = require('../student/student.model');

const GroupRepository = {
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
        const course = await Grupa.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Grupa.update(data);
    },

    async deleteCourse(id) {
        const course = await Grupa.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Grupa.destroy();
    },

    async getStudents(id_grupa) {
        const grupa = await Grupa.findByPk(id_grupa, {
            include: [{ model: Uczen, as: 'uczniowie' }]
        });
        if (!grupa) throw new Error('Grupa nie znaleziona');
        return grupa.uczniowie;
    },



    async adjustStudentCount(id_grupa, delta) {
        const grupa = await Grupa.findByPk(id_grupa);
        if (!grupa) throw new Error('Grupa nie znaleziona');

        grupa.liczba_uczniow += Number(delta);

        if (grupa.liczba_uczniow < 0) grupa.liczba_uczniow = 0;

        await grupa.save();
        return grupa;
    }




};

module.exports = GroupRepository;
