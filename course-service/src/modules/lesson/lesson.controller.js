const LessonService = require('./lesson.service');
const Zajecia = require('./lesson.model');
const { getTeacherIdFromToken } = require('../middleware/auth.utils');


const LessonController = {
    async getAllForGroup(req, res) {
        try {
            const zajecia = await LessonService.getAllForGroup(req.params.groupId);
            res.json(zajecia);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const zajecia = await LessonService.getOne(req.params.id);
            res.json(zajecia);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const { groupId } = req.params;

            const newLesson = await Zajecia.create({
                id_grupy: groupId,
                Sala_id_sali: req.body.Sala_id_sali,
                tematZajec: req.body.tematZajec,
                data: req.body.data,
                godzina: req.body.godzina,
                notatki_od_nauczyciela: req.body.notatki_od_nauczyciela,
                uwaga_do_sprzetu: req.body.uwaga_do_sprzetu
            });

            res.json(newLesson);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await LessonService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await LessonService.delete(req.params.id);
            res.json({ message: "Usunięto zajęcia" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async getLessonsForTeacherByMonth(req, res) {
        try {
            const teacherId = getTeacherIdFromToken(req);
            const { year, month } = req.body;

            if (!year || !month) {
                return res.status(400).json({ error: "Brakuje roku lub miesiąca" });
            }

            const lessons = await LessonService.getLessonsForTeacherByMonth(
                teacherId,
                parseInt(year),
                parseInt(month)
            );

            res.json(lessons);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },


    async createLessonsForGroup(req, res) {
        try {
            const { groupId } = req.params;
            const createdLessons = await LessonService.createLessonsForGroup(groupId);

            res.status(201).json({
                message: `Utworzono ${createdLessons.length} zajęć dla grupy`,
                zajecia: createdLessons
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },

    async getTechnicalReports(req, res) {
        try {
            const reports = await LessonService.getTechnicalReports();
            res.json(reports);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },

    async clearTechnicalReport(req, res) {
        try {
            const updated = await LessonService.clearTechnicalReport(req.params.id);
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }

};

module.exports = LessonController;