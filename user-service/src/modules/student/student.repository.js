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

    async assignGuardian(uczenId, opiekunId) {
        const uczen = await Uczen.findByPk(uczenId);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        return await uczen.update({ Opiekun_id_opiekuna: opiekunId });
    }
};

module.exports = UczenRepository;
