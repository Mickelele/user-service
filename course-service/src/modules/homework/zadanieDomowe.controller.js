const HomeworkService = require('./zadanieDomowe.service');

const HomeworkController = {
    async create(req, res) {
        try {
            const homework = await HomeworkService.addHomework(req.body);
            res.status(201).json(homework);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getForGroup(req, res) {
        try {
            const id_grupy = req.params.id_grupy;

            const id_ucznia = Number(req.user && (req.user.id || req.user.id_ucznia || req.user.id_uzytkownika || req.user.sub));
            if (!id_ucznia || Number.isNaN(id_ucznia)) {
                return res.status(401).json({ error: 'Brak danych użytkownika (token)' });
            }

            if (!id_ucznia) {
                return res.status(401).json({ error: 'Brak danych użytkownika (token)' });
            }

            const homework = await HomeworkService.getHomeworkForGroup(id_grupy, id_ucznia);
            res.status(200).json(homework);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getAllForGroupWithStatus(req, res) {
        try {
            const id_grupy = req.params.id_grupy;

            const id_ucznia = Number(req.user && (req.user.id || req.user.id_ucznia || req.user.id_uzytkownika || req.user.sub));
            if (!id_ucznia || Number.isNaN(id_ucznia)) {
                return res.status(401).json({ error: 'Brak danych użytkownika (token)' });
            }

            const homework = await HomeworkService.getAllHomeworkForGroupWithStatus(id_grupy, id_ucznia);
            res.status(200).json(homework);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const homework = await HomeworkService.updateHomework(req.params.id, req.body);
            res.status(200).json(homework);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await HomeworkService.deleteHomework(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }


};

module.exports = HomeworkController;
