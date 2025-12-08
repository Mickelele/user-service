const PrizeService = require('./prize.service');

class PrizeController {
    async getAll(req, res) {
        try {
            const prizes = await PrizeService.getAll();
            res.json(prizes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const prize = await PrizeService.getOne(req.params.id);
            res.json(prize);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const prize = await PrizeService.create(req.body);
            res.status(201).json(prize);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const prize = await PrizeService.update(req.params.id, req.body);
            res.json(prize);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await PrizeService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getStudentPrizes(req, res) {
        try {
            const prizes = await PrizeService.getStudentPrizes(req.params.studentId);
            res.json(prizes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async redeemPrize(req, res) {
        try {
            const { id_ucznia, id_nagrody } = req.body;
            const result = await PrizeService.redeemPrize(id_ucznia, id_nagrody);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getPrizeHistory(req, res) {
        try {
            const history = await PrizeService.getPrizeHistory();
            res.json(history);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PrizeController();
