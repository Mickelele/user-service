const SalaRepository = require('./room.repository');

class SalaService {

    getAll() {
        return SalaRepository.findAll();
    }

    getOne(id) {
        return SalaRepository.findOne(id);
    }

    create(data) {
        return SalaRepository.create(data);
    }

    update(id, data) {
        return SalaRepository.update(id, data);
    }

    delete(id) {
        return SalaRepository.delete(id);
    }
}

module.exports = new SalaService();
