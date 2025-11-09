const axios = require('axios');
const UczenRepository = require('./student.repository');

class UczenService {
    constructor() {
        this.userServiceUrl = process.env.USER_SERVICE_URL;
    }

    async getAll() {
        const uczniowie = await UczenRepository.findAll();

        const uczniowieZUserami = await Promise.all(
            uczniowie.map(async (u) => {
                try {
                    const res = await axios.get(`${this.userServiceUrl}/api/users/${u.id_ucznia}`);
                    return { ...u.toJSON(), user: res.data };
                } catch {
                    return { ...u.toJSON(), user: null };
                }
            })
        );

        return uczniowieZUserami;
    }

    async getOne(id) {
        const uczen = await UczenRepository.findById(id);
        if (!uczen) throw new Error('Uczeń nie znaleziony');

        try {
            const res = await axios.get(`${this.userServiceUrl}/api/users/${uczen.id_ucznia}`);
            return { ...uczen.toJSON(), user: res.data };
        } catch {
            return { ...uczen.toJSON(), user: null };
        }
    }

    async create(data) {
        return await UczenRepository.create(data);
    }

    async update(id, data) {
        return await UczenRepository.update(id, data);
    }

    async delete(id) {
        return await UczenRepository.delete(id);
    }


    async assignToGroup(data) {
        const { id_ucznia, id_grupa } = data;
        if (!id_ucznia || !id_grupa) throw new Error('Brak wymaganych danych');
        return await UczenRepository.assignToGroup(id_ucznia, id_grupa);
    }
}

module.exports = new UczenService();
