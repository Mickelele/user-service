const HomeworkAnswerRepository = require('./odpowiedzNaZadanie.repository');

class HomeworkAnswerService {
    async addAnswer(data) {
        if (!data.id_zadania || !data.id_ucznia || !data.tresc) {
            throw new Error("Brak wymaganych pól: id_zadania, id_ucznia, tresc");
        }
        return await HomeworkAnswerRepository.createAnswer(data);
    }

    async getAnswersByHomeworkId(id_zadania) {
        if (!id_zadania) {
            throw new Error("Brak id_zadania");
        }
        return await HomeworkAnswerRepository.getAnswersByHomeworkId(id_zadania);
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
        if (!id_zadania || !id_ucznia) {
            throw new Error("Brak id_zadania lub id_ucznia");
        }
        return await HomeworkAnswerRepository.getStudentAnswer(id_zadania, id_ucznia);
    }

    async getHomeworksForStudent(id_ucznia) {
        if (!id_ucznia) throw new Error("Brak id_ucznia");

        return await HomeworkAnswerRepository.getAnswersByStudentId(id_ucznia);
    }

    async getHomeworksForStudents(studentIds) {
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            throw new Error("Brak listy id uczniów");
        }

        return await HomeworkAnswerRepository.getAnswersByStudents(studentIds);
    }
}

module.exports = new HomeworkAnswerService();