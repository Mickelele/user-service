const UwagaService = require('./comment.service');

const CommentController = {
    async getAll(req, res) {
        try {
            const uwagi = await UwagaService.getAll();
            res.json(uwagi);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const uwaga = await UwagaService.getOne(req.params.id);
            res.json(uwaga);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const { id_ucznia, id_zajec, tresc, id_nauczyciela } = req.body;

            if (!id_ucznia || !id_zajec || !tresc)
                return res.status(400).json({ error: 'Brak wymaganych danych' });

            const nowa = await UwagaService.create({
                id_ucznia,
                id_zajec,
                tresc,
                id_nauczyciela
            });

            res.status(201).json(nowa);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await UwagaService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = CommentController;
