const UwagaRepository = require('./comment.repository');

class CommentService {
    async getAll() {
        return await UwagaRepository.findAll();
    }

    async getOne(id) {
        const uwaga = await UwagaRepository.findById(id);
        if (!uwaga) throw new Error('Uwaga nie znaleziona');
        return uwaga;
    }

    async create({ id_ucznia, id_zajec, tresc, id_nauczyciela }) {
        return await UwagaRepository.create({
            id_ucznia,
            id_zajec,
            tresc,
            id_nauczyciela
        });
    }

    async delete(id) {
        return await UwagaRepository.delete(id);
    }
}

module.exports = new CommentService();
