const Obecnosc = require('./presence.model');
const Zajecia = require('../lesson/lesson.model');

const PresenceRepository = {

    async findAllForLesson(id_zajec) {
        return Obecnosc.findAll({ where: { id_zajec } });
    },

    async findOne(id) {
        return Obecnosc.findByPk(id);
    },

    async create(data) {
        return Obecnosc.create(data);
    },

    async update(id, data) {
        const presence = await Obecnosc.findByPk(id);
        if (!presence) throw new Error("Obecność nie znaleziona");

        await presence.update(data);
        return presence;
    },

    async delete(id) {
        const presence = await Obecnosc.findByPk(id);
        if (!presence) throw new Error("Obecność nie znaleziona");

        await presence.destroy();
        return;
    },




    async findForUser(id_ucznia) {
        return Obecnosc.findAll({
            where: { id_ucznia },
            include: [
                {
                    model: Zajecia,
                    as: 'zajecia',
                    attributes: ['id_zajec', 'tematZajec', 'data']
                }
            ]
        });
    },

    async findByGroupId(id_grupy) {
        return Obecnosc.findAll({
            include: [
                {
                    model: Zajecia,
                    as: 'zajecia',
                    where: { id_grupy },
                    attributes: ['id_zajec', 'tematZajec', 'data', 'id_grupy']
                }
            ]
        });
    }

};

module.exports = PresenceRepository;
