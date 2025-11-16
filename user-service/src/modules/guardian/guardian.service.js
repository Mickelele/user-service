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

    async getStudentsWithUserInfo(id) {
        const uczniowie = await OpiekunRepository.findStudentsWithUserInfo(id);

        return uczniowie.map(uczen => ({
            id_ucznia: uczen.id_ucznia,
            id_grupa: uczen.id_grupa,
            Opiekun_id_opiekuna: uczen.Opiekun_id_opiekuna,
            saldo_punktow: uczen.saldo_punktow,
            pseudonim: uczen.pseudonim,
            user: uczen.user ? {
                id_uzytkownika: uczen.user.id_uzytkownika,
                imie: uczen.user.imie,
                nazwisko: uczen.user.nazwisko,
                email: uczen.user.email
            } : null
        }));
    }
}

module.exports = new OpiekunService();
