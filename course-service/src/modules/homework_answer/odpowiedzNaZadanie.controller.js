const HomeworkAnswerService = require('./odpowiedzNaZadanie.service');

const HomeworkAnswerController = {
    async create(req, res) {
        try {
            const id_ucznia = req.user.id;
            const { id_zadania, tresc } = req.body;

            if (!id_zadania || !tresc) {
                throw new Error("Brak id_zadania lub tresci odpowiedzi");
            }

            const odpowiedz = await HomeworkAnswerService.addAnswer({
                id_ucznia,
                id_zadania,
                tresc
            });

            res.status(201).json(odpowiedz);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getAnswers(req, res) {
        try {
            const { id_zadania } = req.params;
            const odpowiedzi = await HomeworkAnswerService.getAnswersByHomeworkId(id_zadania);
            res.status(200).json(odpowiedzi);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async gradeAnswer(req, res) {
        try {
            const { id_odpowiedzi } = req.params;
            const { ocena } = req.body;

            if (ocena === undefined || ocena === null) {
                throw new Error("Brak oceny");
            }

            const ocenaNum = Number(ocena);
            if (isNaN(ocenaNum) || ocenaNum < 0 || ocenaNum > 100) {
                throw new Error("Ocena musi być liczbą w zakresie 0-100");
            }

            const odpowiedz = await HomeworkAnswerService.gradeAnswer(id_odpowiedzi, ocenaNum);
            res.status(200).json(odpowiedz);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getStudentAnswer(req, res) {
        try {
            const { id_zadania } = req.params;
            const id_ucznia = req.user.id;

            const odpowiedz = await HomeworkAnswerService.getStudentAnswer(id_zadania, id_ucznia);
            res.status(200).json(odpowiedz);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = HomeworkAnswerController;