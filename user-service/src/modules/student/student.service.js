const axios = require('axios');
const bcrypt = require('bcrypt');
const UczenRepository = require('./student.repository');
const UserService = require('../users/user.service');


class UczenService {
    constructor() {
        this.userServiceUrl = process.env.USER_SERVICE_URL;
        this.authServiceUrl = process.env.AUTO_SERIVCE_URL;
        this.courseServiceUrl = process.env.COURSE_SERVICE_URL;
    }

    async getAll() {
        const uczniowie = await UczenRepository.findAll();

        const uczniowieZUserami = await Promise.all(
            uczniowie.map(async (u) => {
                try {
                    const res = await axios.get(`${this.userServiceUrl}/uzytkownicy/${u.id_ucznia}`);
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
            const res = await axios.get(`${this.userServiceUrl}/uzytkownicy/${uczen.id_ucznia}`);
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
        let newUser;

        try {
            newUser = await UserService.createUser({
                imie,
                nazwisko,
                email,
                haslo,
                rola: 'uczen'
            });
        } catch (err) {
            console.error('Błąd z user-service:', err.message);
            throw new Error('Błąd przy tworzeniu użytkownika');
        }


        const newStudent = await UczenRepository.create({
            id_ucznia: newUser.id_uzytkownika,
            id_grupa,
            Opiekun_id_opiekuna: opiekunId,
            saldo_punktow: 0,
            pseudonim
        });


        try {
            await axios.post(`${this.courseServiceUrl}/groups/${id_grupa}/adjust-student-count`, {
                delta: 1
            });
        } catch (err) {
            console.error('Błąd w course-service:', err.response?.status, err.response?.data);

        }

        return newStudent;
    }








}

module.exports = new UczenService();
