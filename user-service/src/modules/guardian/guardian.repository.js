// src/modules/opiekun/opiekun.repository.js
const Opiekun = require('./guardian.model');

const OpiekunRepository = {
    async findAll() {
        return await Opiekun.findAll();
    },

    async findById(id) {
        return await Opiekun.findByPk(id);
    },

    async create(data) {
        return await Opiekun.create(data);
    },

    async update(id, data) {
        const opiekun = await Opiekun.findByPk(id);
        if (!opiekun) throw new Error('Opiekun nie znaleziony');
        return await opiekun.update(data);
    },

    async delete(id) {
        const opiekun = await Opiekun.findByPk(id);
        if (!opiekun) throw new Error('Opiekun nie znaleziony');
        await opiekun.destroy();
        return { message: 'Usunięto opiekuna' };
    },

    async findStudents(id_opiekuna) {
        return await require('../student/student.model').findAll({
            where: { Opiekun_id_opiekuna: id_opiekuna }
        });
    }



};

module.exports = OpiekunRepository;
