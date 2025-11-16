// src/modules/opiekun/opiekun.service.js
const OpiekunRepository = require('./guardian.repository');

class OpiekunService {
    async getAll() {
        return await OpiekunRepository.findAll();
    }

    async getOne(id) {
        const opiekun = await OpiekunRepository.findById(id);
        if (!opiekun) throw new Error('Opiekun nie znaleziony');
        return opiekun;
    }

    async create(data) {
        return await OpiekunRepository.create(data);
    }

    async update(id, data) {
        return await OpiekunRepository.update(id, data);
    }

    async delete(id) {
        return await OpiekunRepository.delete(id);
    }

    async getStudents(id) {
        return await OpiekunRepository.findStudents(id);
    }
}

module.exports = new OpiekunService();
