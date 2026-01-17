const Zajecia = require('./lesson.model');
const Grupa = require('../group/group.model');
const Sala = require('../room/room.model');
const { Op } = require('sequelize');

const LessonRepository = {
    async findAllByGroup(id_grupy) {
        return Zajecia.findAll({ where: { id_grupy } });
    },

    async findOne(id) {
        return Zajecia.findByPk(id);
    },

    async create(data) {
        return Zajecia.create(data);
    },

    async update(id, data) {
        const zaj = await Zajecia.findByPk(id);
        if (!zaj) throw new Error("Zajęcia nie znalezione");
        await zaj.update(data);
        return zaj;
    },

    async delete(id) {
        const zaj = await Zajecia.findByPk(id);
        if (!zaj) throw new Error("Zajęcia nie znalezione");
        await zaj.destroy();
        return;
    },
    async findByTeacherAndMonth(teacherId, year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const lessons = await Zajecia.findAll({
            include: [{
                model: Grupa,
                as: 'grupa',
                where: { id_nauczyciela: teacherId }
            }],
            where: {
                data: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['data', 'ASC']]
        });

        return lessons.map(l => ({
            ...l.toJSON(),
            godzina: l.grupa.godzina
        }));
    },

    async findTechnicalReports() {
        return await Zajecia.findAll({
            where: {
                uwaga_do_sprzetu: {
                    [Op.ne]: null,
                    [Op.ne]: ''
                }
            },
            include: [
                {
                    model: Sala,
                    as: 'sala'
                },
                {
                    model: Grupa,
                    as: 'grupa'
                }
            ],
            order: [['data', 'DESC']]
        });
    },

    async clearTechnicalReport(id) {
        const zaj = await Zajecia.findByPk(id);
        if (!zaj) throw new Error('Zajęcia nie znalezione');
        await zaj.update({ uwaga_do_sprzetu: null });
        return zaj;
    },

    async updateRoomForGroup(id_grupy, Sala_id_sali) {
        const result = await Zajecia.update(
            { Sala_id_sali },
            { where: { id_grupy } }
        );
        return result[0];
    }
};

module.exports = LessonRepository;
