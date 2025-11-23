const ReservationRepository = require('./reservation.repository');

class ReservationService {

    getAll() {
        return ReservationRepository.findAll();
    }

    getOne(id) {
        return ReservationRepository.findOne(id);
    }

    create(data) {
        return ReservationRepository.create(data);
    }

    update(id, data) {
        return ReservationRepository.update(id, data);
    }

    delete(id) {
        return ReservationRepository.delete(id);
    }

    async getForSala(id_sali) {
        return ReservationRepository.findForSala(id_sali);
    }

}

module.exports = new ReservationService();
