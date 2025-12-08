const PointsRepository = require('./points.repository');

class PointsService {
    async getAllStudents() {
        return await PointsRepository.findAll();
    }

    async getStudentById(id_ucznia) {
        const uczen = await PointsRepository.findById(id_ucznia);
        if (!uczen) throw new Error('Uczeń nie znaleziony');
        return uczen;
    }

    async getStudentPoints(id_ucznia) {
        const points = await PointsRepository.getStudentPoints(id_ucznia);
        return { id_ucznia, saldo_punktow: points };
    }

    async addPoints(id_ucznia, punkty) {
        if (punkty <= 0) throw new Error('Liczba punktów musi być większa od zera');
        return await PointsRepository.addPoints(id_ucznia, punkty);
    }

    async subtractPoints(id_ucznia, punkty) {
        if (punkty <= 0) throw new Error('Liczba punktów musi być większa od zera');
        return await PointsRepository.subtractPoints(id_ucznia, punkty);
    }

    async setPoints(id_ucznia, punkty) {
        if (punkty < 0) throw new Error('Liczba punktów nie może być ujemna');
        return await PointsRepository.setPoints(id_ucznia, punkty);
    }

    async updateStudent(id_ucznia, data) {
        return await PointsRepository.update(id_ucznia, data);
    }

    async getRanking(limit = null) {
        const ranking = await PointsRepository.getRanking(limit);
        return ranking.map((uczen, index) => ({
            pozycja: index + 1,
            id_ucznia: uczen.id_ucznia,
            pseudonim: uczen.pseudonim,
            saldo_punktow: uczen.saldo_punktow,
            id_grupa: uczen.id_grupa
        }));
    }

    async getRankingByGroup(id_grupa, limit = null) {
        const ranking = await PointsRepository.getRankingByGroup(id_grupa, limit);
        return ranking.map((uczen, index) => ({
            pozycja: index + 1,
            id_ucznia: uczen.id_ucznia,
            pseudonim: uczen.pseudonim,
            saldo_punktow: uczen.saldo_punktow
        }));
    }
}

module.exports = new PointsService();
