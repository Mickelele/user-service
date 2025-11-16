const Zajecia = require('./lesson.model');

const LessonRepository = {
    async findAllByGroup(id_grupy) {
        return Zajecia.findAll({ where: { id_grupy } });
    },

    async findOne(id) {
        return Zajecia.findByPk(id);
    },

    async create(data) {
        return Zajecia.create(data);
    },

    async update(id, data) {
        const zaj = await Zajecia.findByPk(id);
        if (!zaj) throw new Error("Zajęcia nie znalezione");
        await zaj.update(data);
        return zaj;
    },

    async delete(id) {
        const zaj = await Zajecia.findByPk(id);
        if (!zaj) throw new Error("Zajęcia nie znalezione");
        await zaj.destroy();
        return;
    }
};

module.exports = LessonRepository;
