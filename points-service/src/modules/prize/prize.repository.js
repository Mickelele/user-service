const Nagroda = require('./prize.model');
const RelacjaNagrodaUczen = require('./prizeStudent.model');
const Uczen = require('../points/points.model');

class PrizeRepository {
    async findAll() {
        return await Nagroda.findAll({
            order: [['koszt', 'ASC']]
        });
    }

    async findById(id) {
        return await Nagroda.findByPk(id);
    }

    async create(data) {
        return await Nagroda.create(data);
    }

    async update(id, data) {
        const nagroda = await this.findById(id);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');
        return await nagroda.update(data);
    }

    async delete(id) {
        const nagroda = await this.findById(id);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');
        return await nagroda.destroy();
    }

    async getStudentPrizes(id_ucznia) {
        return await RelacjaNagrodaUczen.findAll({
            where: { id_ucznia },
            include: [{
                model: Nagroda,
                as: 'nagroda'
            }],
            order: [['data', 'DESC']]
        });
    }

    async redeemPrize(id_ucznia, id_nagrody) {
        return await RelacjaNagrodaUczen.create({
            id_ucznia,
            id_nagrody,
            data: new Date()
        });
    }

    async getPrizeHistory() {
        return await RelacjaNagrodaUczen.findAll({
            include: [
                {
                    model: Nagroda,
                    as: 'nagroda'
                },
                {
                    model: Uczen,
                    as: 'uczen'
                }
            ],
            order: [['data', 'DESC']]
        });
    }
}

module.exports = new PrizeRepository();
