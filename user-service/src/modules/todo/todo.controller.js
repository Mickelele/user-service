const TodoService = require('./todo.service');

const TodoController = {
    async getAllTaskStatuses(req, res) {
        try {
            const statuses = await TodoService.getAllTaskStatuses();
            res.json(statuses);
        } catch (err) {
            console.error('Błąd przy pobieraniu statusów zadań:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },

    async getListyZadanByUczenId(req, res) {
        try {
            const { uczenId } = req.params;
            const listy = await TodoService.getListyZadanByUczenId(uczenId);
            res.json(listy);
        } catch (err) {
            console.error('Błąd przy pobieraniu list zadań:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async getListaZadanById(req, res) {
        try {
            const { listaId } = req.params;
            const lista = await TodoService.getListaZadanById(listaId);
            res.json(lista);
        } catch (err) {
            console.error('Błąd przy pobieraniu listy zadań:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async createListaZadan(req, res) {
        try {
            const lista = await TodoService.createListaZadan(req.body);
            res.status(201).json(lista);
        } catch (err) {
            console.error('Błąd przy tworzeniu listy zadań:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async updateListaZadan(req, res) {
        try {
            const { listaId } = req.params;
            const updated = await TodoService.updateListaZadan(listaId, req.body);
            res.json(updated);
        } catch (err) {
            console.error('Błąd przy aktualizacji listy zadań:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async deleteListaZadan(req, res) {
        try {
            const { listaId } = req.params;
            const result = await TodoService.deleteListaZadan(listaId);
            res.json(result);
        } catch (err) {
            console.error('Błąd przy usuwaniu listy zadań:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async getZadaniaByUczenId(req, res) {
        try {
            const { uczenId } = req.params;
            const { id_statusu, id_lista } = req.query;
            
            const filters = {};
            if (id_statusu) filters.id_statusu = parseInt(id_statusu);
            if (id_lista) filters.id_lista = parseInt(id_lista);
            
            const zadania = await TodoService.getZadaniaByUczenId(uczenId, filters);
            res.json(zadania);
        } catch (err) {
            console.error('Błąd przy pobieraniu zadań:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async getZadanieById(req, res) {
        try {
            const { zadanieId } = req.params;
            const zadanie = await TodoService.getZadanieById(zadanieId);
            res.json(zadanie);
        } catch (err) {
            console.error('Błąd przy pobieraniu zadania:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async createZadanie(req, res) {
        try {
            const zadanie = await TodoService.createZadanie(req.body);
            res.status(201).json(zadanie);
        } catch (err) {
            console.error('Błąd przy tworzeniu zadania:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async updateZadanie(req, res) {
        try {
            const { zadanieId } = req.params;
            const updated = await TodoService.updateZadanie(zadanieId, req.body);
            res.json(updated);
        } catch (err) {
            console.error('Błąd przy aktualizacji zadania:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async deleteZadanie(req, res) {
        try {
            const { zadanieId } = req.params;
            const result = await TodoService.deleteZadanie(zadanieId);
            res.json(result);
        } catch (err) {
            console.error('Błąd przy usuwaniu zadania:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async markZadanieAsCompleted(req, res) {
        try {
            const { zadanieId } = req.params;
            const updated = await TodoService.markZadanieAsCompleted(zadanieId);
            res.json(updated);
        } catch (err) {
            console.error('Błąd przy oznaczaniu zadania jako wykonane:', err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = TodoController;
