const Uczen = require('./points.model');

class PointsRepository {
    async findAll() {
        return await Uczen.findAll();
    }

    async findById(id) {
        return await Uczen.findByPk(id);
    }

    async getStudentPoints(id_ucznia) {
        const uczen = await Uczen.findByPk(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        return uczen.saldo_punktow;
    }

    async addPoints(id_ucznia, punkty) {
        const uczen = await this.findById(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        uczen.saldo_punktow += punkty;
        await uczen.save();
        return uczen;
    }

    async subtractPoints(id_ucznia, punkty) {
        const uczen = await this.findById(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        if (uczen.saldo_punktow < punkty) {
            throw new Error('Niewystarczająca liczba punktów');
        }
        uczen.saldo_punktow -= punkty;
        await uczen.save();
        return uczen;
    }

    async setPoints(id_ucznia, punkty) {
        const uczen = await this.findById(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        uczen.saldo_punktow = punkty;
        await uczen.save();
        return uczen;
    }

    async update(id, data) {
        const uczen = await this.findById(id);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        return await uczen.update(data);
    }

    async getRanking(limit = null) {
        const options = {
            order: [['saldo_punktow', 'DESC']],
            attributes: ['id_ucznia', 'pseudonim', 'saldo_punktow', 'id_grupa']
        };
        if (limit) {
            options.limit = limit;
        }
        return await Uczen.findAll(options);
    }

    async getRankingByGroup(id_grupa, limit = null) {
        const options = {
            where: { id_grupa },
            order: [['saldo_punktow', 'DESC']],
            attributes: ['id_ucznia', 'pseudonim', 'saldo_punktow', 'id_grupa']
        };
        if (limit) {
            options.limit = limit;
        }
        return await Uczen.findAll(options);
    }
}

module.exports = new PointsRepository();
