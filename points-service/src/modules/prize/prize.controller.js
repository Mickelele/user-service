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

    async uploadImage(req, res) {
        try {
            const { id } = req.params;
            
            if (!req.file) {
                return res.status(400).json({ error: 'Brak pliku' });
            }

            const result = await PrizeService.uploadImage(id, req.file.buffer);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getImage(req, res) {
        try {
            const { id } = req.params;
            const imageBuffer = await PrizeService.getImage(id);
            
            res.set('Content-Type', 'image/jpeg');
            res.send(imageBuffer);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async deleteImage(req, res) {
        try {
            const { id } = req.params;
            const result = await PrizeService.deleteImage(id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }


    async test(req, res) {
            res.status(200).json({ message: 'Test endpoint działa poprawnie' });
    }
}

module.exports = new PrizeController();
