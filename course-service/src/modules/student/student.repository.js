const Uczen = require('./student.model');

const UczenRepository = {
    async findAll() {
        return await Uczen.findAll();
    },

    async findById(id) {
        return await Uczen.findByPk(id);
    },

    async create(data) {
        return await Uczen.create(data);
    },

    async update(id, data) {
        const uczen = await Uczen.findByPk(id);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        return await uczen.update(data);
    },

    async delete(id) {
        const uczen = await Uczen.findByPk(id);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        await uczen.destroy();
        return { message: 'Usunięto ucznia' };
    },


    async assignToGroup(id_ucznia, id_grupa) {
        const uczen = await Uczen.findByPk(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        uczen.id_grupa = id_grupa;
        await uczen.save();
        return uczen;
    }



};

module.exports = UczenRepository;
