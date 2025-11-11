const Nauczyciel = require('./teacher.model');

const TeacherRepository = {
    async findAll() {
        return await Nauczyciel.findAll();
    },

    async findById(id) {
        return await Nauczyciel.findByPk(id);
    },

    async create(data) {
        return await Nauczyciel.create(data);
    },

    async update(id, data) {
        const nauczyciel = await Nauczyciel.findByPk(id);
        if (!nauczyciel) throw new Error('Nauczyciel nie znaleziony');
        return await nauczyciel.update(data);
    },

    async delete(id) {
        const nauczyciel = await Nauczyciel.findByPk(id);
        if (!nauczyciel) throw new Error('Nauczyciel nie znaleziony');
        await nauczyciel.destroy();
        return { message: 'Usunięto nauczyciela' };
    }
};

module.exports = TeacherRepository;
