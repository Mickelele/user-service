const HomeworkAnswerRepository = require('./odpowiedzNaZadanie.repository');
const axios = require('axios');
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

class HomeworkAnswerService {
    async addAnswer(data) {
        if (!data.id_zadania || !data.id_ucznia || !data.tresc) {
            throw new Error("Brak wymaganych pól: id_zadania, id_ucznia, tresc");
        }
        return await HomeworkAnswerRepository.createAnswer(data);
    }

    async getAnswersByHomeworkId(id_zadania) {
        if (!id_zadania) throw new Error("Brak id_zadania");

        const odpowiedzi = await HomeworkAnswerRepository.getAnswersByHomeworkId(id_zadania);
        return await this._attachUserData(odpowiedzi);
    }

    async gradeAnswer(id_odpowiedzi, ocena) {
        if (!id_odpowiedzi || ocena === undefined) {
            throw new Error("Brak id_odpowiedzi lub oceny");
        }
        if (ocena < 0 || ocena > 100) {
            throw new Error("Ocena musi być w zakresie 0-100");
        }
        return await HomeworkAnswerRepository.gradeAnswer(id_odpowiedzi, ocena);
    }

    async getStudentAnswer(id_zadania, id_ucznia) {
        if (!id_zadania || !id_ucznia) throw new Error("Brak id_zadania lub id_ucznia");

        const odpowiedz = await HomeworkAnswerRepository.getStudentAnswer(id_zadania, id_ucznia);
        if (!odpowiedz) return null;

        const user = await this._fetchUser(id_ucznia);
        return { ...odpowiedz.dataValues, user };
    }

    async getHomeworksForStudent(id_ucznia) {
        if (!id_ucznia) throw new Error("Brak id_ucznia");

        const odpowiedzi = await HomeworkAnswerRepository.getAnswersByStudentId(id_ucznia);
        return await this._attachUserData(odpowiedzi);
    }

    async getHomeworksForStudents(studentIds) {
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            throw new Error("Brak listy id uczniów");
        }

        const odpowiedzi = await HomeworkAnswerRepository.getAnswersByStudents(studentIds);
        return await this._attachUserData(odpowiedzi);
    }

    async _attachUserData(answers) {
        const userIds = [...new Set(answers.map(a => a.id_ucznia))];
        const users = await Promise.all(userIds.map(id => this._fetchUser(id)));
        const userMap = {};
        users.forEach(u => { if(u) userMap[u.id_uzytkownika] = u; });

        return answers.map(a => ({
            ...a.dataValues,
            user: userMap[a.id_ucznia] || null
        }));
    }

    async _fetchUser(id) {
        try {
            const res = await axios.get(`${USER_SERVICE_URL}/user/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Błąd pobierania użytkownika ${id}:`, err.message);
            return null;
        }
    }

}

module.exports = new HomeworkAnswerService();
