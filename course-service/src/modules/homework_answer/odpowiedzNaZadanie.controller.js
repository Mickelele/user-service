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
    }
};

module.exports = HomeworkAnswerController;
