const PresenceRepository = require('./presence.repository');

class PresenceService {

    async getAllForLesson(id_zajec) {
        return PresenceRepository.findAllForLesson(id_zajec);
    }

    async getOne(id) {
        const presence = await PresenceRepository.findOne(id);
        if (!presence) throw new Error("Obecność nie znaleziona");
        return presence;
    }

    async create(data) {
        return PresenceRepository.create(data);
    }

    async update(id, data) {
        return PresenceRepository.update(id, data);
    }

    async delete(id) {
        return PresenceRepository.delete(id);
    }

    async getForUser(id_ucznia) {
        return PresenceRepository.findForUser(id_ucznia);
    }

}

module.exports = new PresenceService();
