const axios = require('axios');
const bcrypt = require('bcrypt');
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


    async createStudentWithUser({ imie, nazwisko, email, haslo, pseudonim, id_grupa, opiekunId }) {
        const hashed = await bcrypt.hash(haslo, 10);

        let newUser;
        try {
            const res = await axios.post(`${this.userServiceUrl}/auth/register`, {
                imie,
                nazwisko,
                email,
                haslo: hashed,
                rola: 'uczen'
            });
            newUser = res.data;
        } catch (err) {
            throw new Error(err.response?.data?.error || 'Błąd przy tworzeniu użytkownika');
        }

        const newStudent = await UczenRepository.create({
            id_ucznia: newUser.id_uzytkownika, // id z user-service
            id_grupa,
            Opiekun_id_opiekuna: opiekunId,
            saldo_punktow: 0,
            pseudonim
        });

        return newStudent;
    }



}

module.exports = new UczenService();
