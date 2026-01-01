const StatusRepository = require('./status.repository');

class StatusService {
    
    async getAllRolaStatus() {
        return StatusRepository.getAllRolaStatus();
    }

    async getRolaStatusById(id) {
        const rolaStatus = await StatusRepository.getRolaStatusById(id);
        if (!rolaStatus) {
            throw new Error(`Nie znaleziono statusu o ID ${id}`);
        }
        return rolaStatus;
    }

    async createRolaStatus(data) {
        const { status } = data;
        
        if (!status || status.trim() === '') {
            throw new Error('Status nie może być pusty');
        }

        return StatusRepository.createRolaStatus({ status: status.trim() });
    }

    async updateRolaStatus(id, data) {
        const { status } = data;
        
        if (!status || status.trim() === '') {
            throw new Error('Status nie może być pusty');
        }

        const updated = await StatusRepository.updateRolaStatus(id, { status: status.trim() });
        if (!updated) {
            throw new Error(`Nie znaleziono statusu o ID ${id}`);
        }
        
        return updated;
    }

    async deleteRolaStatus(id) {
        const deleted = await StatusRepository.deleteRolaStatus(id);
        if (!deleted) {
            throw new Error(`Nie znaleziono statusu o ID ${id}`);
        }
        
        return { message: 'Status został usunięty pomyślnie' };
    }

    
    async getAllHistoriaStatusow() {
        return StatusRepository.getAllHistoriaStatusow();
    }

    async getHistoriaStatusowById(id) {
        const historia = await StatusRepository.getHistoriaStatusowById(id);
        if (!historia) {
            throw new Error(`Nie znaleziono historii statusu o ID ${id}`);
        }
        return historia;
    }

    async getHistoriaStatusowByUserId(userId) {
        return StatusRepository.getHistoriaStatusowByUserId(userId);
    }

    async createHistoriaStatusow(data) {
        const { id_uzytkownik, id_statusu, data: dataWpisu } = data;
        
        if (!id_uzytkownik) {
            throw new Error('ID użytkownika jest wymagane');
        }
        
        if (!id_statusu) {
            throw new Error('ID statusu jest wymagane');
        }

        const historiaData = {
            id_uzytkownik,
            id_statusu
        };

        if (dataWpisu) {
            historiaData.data = dataWpisu;
        }

        return StatusRepository.createHistoriaStatusow(historiaData);
    }

    async updateHistoriaStatusow(id, data) {
        const { id_statusu, data: dataWpisu } = data;
        
        const updateData = {};
        
        if (id_statusu) {
            updateData.id_statusu = id_statusu;
        }
        
        if (dataWpisu) {
            updateData.data = dataWpisu;
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error('Brak danych do aktualizacji');
        }

        const updated = await StatusRepository.updateHistoriaStatusow(id, updateData);
        if (!updated) {
            throw new Error(`Nie znaleziono historii statusu o ID ${id}`);
        }
        
        return updated;
    }

    async deleteHistoriaStatusow(id) {
        const deleted = await StatusRepository.deleteHistoriaStatusow(id);
        if (!deleted) {
            throw new Error(`Nie znaleziono historii statusu o ID ${id}`);
        }
        
        return { message: 'Historia statusu została usunięta pomyślnie' };
    }

    async getCurrentStatusByUserId(userId) {
        const historia = await StatusRepository.getHistoriaStatusowByUserId(userId);
        
        if (!historia || historia.length === 0) {
            return null;
        }
        
        return historia[0];
    }
}

module.exports = new StatusService();
