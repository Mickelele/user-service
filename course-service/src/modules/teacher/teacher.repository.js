const Nauczyciel = require('./teacher.model');

const TeacherRepository = {
    async findAll() {
        return Nauczyciel.findAll();
    },

    async findById(id) {
        return Nauczyciel.findByPk(id);
    },

    async createNauczyciel(data) {
        return Nauczyciel.create(data);
    },

    async updateNauczyciel(id, data) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Nauczyciel.update(data);
    },

    async deleteNauczyciel(id) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Grupa nie znaleziony');
        return Nauczyciel.destroy();
    }
};

module.exports = TeacherRepository;
