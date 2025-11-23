const Sala = require('./room.model');

const SalaRepository = {

    findAll() {
        return Sala.findAll();
    },

    findOne(id) {
        return Sala.findByPk(id);
    },

    create(data) {
        return Sala.create(data);
    },

    async update(id, data) {
        const room = await Sala.findByPk(id);
        if (!room) throw new Error("Sala nie znaleziona");

        return room.update(data);
    },

    async delete(id) {
        const room = await Sala.findByPk(id);
        if (!room) throw new Error("Sala nie znaleziona");

        return room.destroy();
    }
};

module.exports = SalaRepository;
