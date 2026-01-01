const StatusService = require('./status.service');

const StatusController = {
    async getAllRolaStatus(req, res) {
        try {
            const statusy = await StatusService.getAllRolaStatus();
            res.json(statusy);
        } catch (err) {
            console.error('Błąd przy pobieraniu statusów:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },

    async getRolaStatusById(req, res) {
        try {
            const { id } = req.params;
            const rolaStatus = await StatusService.getRolaStatusById(id);
            res.json(rolaStatus);
        } catch (err) {
            console.error('Błąd przy pobieraniu statusu:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async createRolaStatus(req, res) {
        try {
            const rolaStatus = await StatusService.createRolaStatus(req.body);
            res.status(201).json(rolaStatus);
        } catch (err) {
            console.error('Błąd przy tworzeniu statusu:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async updateRolaStatus(req, res) {
        try {
            const { id } = req.params;
            const updated = await StatusService.updateRolaStatus(id, req.body);
            res.json(updated);
        } catch (err) {
            console.error('Błąd przy aktualizacji statusu:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async deleteRolaStatus(req, res) {
        try {
            const { id } = req.params;
            const result = await StatusService.deleteRolaStatus(id);
            res.json(result);
        } catch (err) {
            console.error('Błąd przy usuwaniu statusu:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async getAllHistoriaStatusow(req, res) {
        try {
            const historia = await StatusService.getAllHistoriaStatusow();
            res.json(historia);
        } catch (err) {
            console.error('Błąd przy pobieraniu historii statusów:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },

    async getHistoriaStatusowById(req, res) {
        try {
            const { id } = req.params;
            const historia = await StatusService.getHistoriaStatusowById(id);
            res.json(historia);
        } catch (err) {
            console.error('Błąd przy pobieraniu historii statusu:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async getHistoriaStatusowByUserId(req, res) {
        try {
            const { userId } = req.params;
            const historia = await StatusService.getHistoriaStatusowByUserId(userId);
            res.json(historia);
        } catch (err) {
            console.error('Błąd przy pobieraniu historii statusów użytkownika:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },

    async getCurrentStatusByUserId(req, res) {
        try {
            const { userId } = req.params;
            const currentStatus = await StatusService.getCurrentStatusByUserId(userId);
            
            if (!currentStatus) {
                return res.status(404).json({ error: 'Użytkownik nie ma przypisanego statusu' });
            }
            
            res.json(currentStatus);
        } catch (err) {
            console.error('Błąd przy pobieraniu aktualnego statusu użytkownika:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },

    async createHistoriaStatusow(req, res) {
        try {
            const historia = await StatusService.createHistoriaStatusow(req.body);
            res.status(201).json(historia);
        } catch (err) {
            console.error('Błąd przy tworzeniu historii statusu:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async updateHistoriaStatusow(req, res) {
        try {
            const { id } = req.params;
            const updated = await StatusService.updateHistoriaStatusow(id, req.body);
            res.json(updated);
        } catch (err) {
            console.error('Błąd przy aktualizacji historii statusu:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async deleteHistoriaStatusow(req, res) {
        try {
            const { id } = req.params;
            const result = await StatusService.deleteHistoriaStatusow(id);
            res.json(result);
        } catch (err) {
            console.error('Błąd przy usuwaniu historii statusu:', err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = StatusController;
