const PrizeRepository = require('./prize.repository');
const PointsRepository = require('../points/points.repository');

class PrizeService {
    async getAll() {
        return await PrizeRepository.findAll();
    }

    async getOne(id) {
        const nagroda = await PrizeRepository.findById(id);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');
        return nagroda;
    }

    async create(data) {
        return await PrizeRepository.create(data);
    }

    async update(id, data) {
        return await PrizeRepository.update(id, data);
    }

    async delete(id) {
        return await PrizeRepository.delete(id);
    }

    async getStudentPrizes(id_ucznia) {
        return await PrizeRepository.getStudentPrizes(id_ucznia);
    }

    async redeemPrize(id_ucznia, id_nagrody) {
        // Sprawdź czy nagroda istnieje
        const nagroda = await PrizeRepository.findById(id_nagrody);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');

        // Sprawdź saldo ucznia
        const uczen = await PointsRepository.findById(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');

        if (uczen.saldo_punktow < nagroda.koszt) {
            throw new Error('Niewystarczająca liczba punktów');
        }

        // Odejmij punkty
        await PointsRepository.subtractPoints(id_ucznia, nagroda.koszt);

        // Dodaj wpis do tabeli relacji
        const relacja = await PrizeRepository.redeemPrize(id_ucznia, id_nagrody);

        return {
            relacja,
            nagroda,
            nowe_saldo: uczen.saldo_punktow - nagroda.koszt
        };
    }

    async getPrizeHistory() {
        return await PrizeRepository.getPrizeHistory();
    }

    async uploadImage(id_nagrody, imageBuffer) {
        const nagroda = await PrizeRepository.findById(id_nagrody);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');

        nagroda.zdjecie = imageBuffer;
        await nagroda.save();
        return { message: 'Zdjęcie zostało przesłane' };
    }

    async getImage(id_nagrody) {
        const nagroda = await PrizeRepository.findById(id_nagrody);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');
        if (!nagroda.zdjecie) throw new Error('Nagroda nie ma zdjęcia');
        return nagroda.zdjecie;
    }

    async deleteImage(id_nagrody) {
        const nagroda = await PrizeRepository.findById(id_nagrody);
        if (!nagroda) throw new Error('Nagroda nie znaleziona');
        
        nagroda.zdjecie = null;
        await nagroda.save();
        return { message: 'Zdjęcie zostało usunięte' };
    }
}

module.exports = new PrizeService();
