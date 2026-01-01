const TodoRepository = require('./todo.repository');

class TodoService {
    async getAllTaskStatuses() {
        return TodoRepository.getAllTaskStatuses();
    }

    async getListyZadanByUczenId(uczenId) {
        if (!uczenId) {
            throw new Error('ID ucznia jest wymagane');
        }
        return TodoRepository.getListyZadanByUczenId(uczenId);
    }

    async getListaZadanById(listaId) {
        const lista = await TodoRepository.getListaZadanById(listaId);
        if (!lista) {
            throw new Error(`Nie znaleziono listy zadań o ID ${listaId}`);
        }
        return lista;
    }

    async createListaZadan(data) {
        const { id_ucznia, nazwa, opis } = data;
        
        if (!id_ucznia) {
            throw new Error('ID ucznia jest wymagane');
        }
        
        if (!nazwa || nazwa.trim() === '') {
            throw new Error('Nazwa listy nie może być pusta');
        }

        return TodoRepository.createListaZadan({
            id_ucznia,
            nazwa: nazwa.trim(),
            opis: opis ? opis.trim() : null
        });
    }

    async updateListaZadan(listaId, data) {
        const { nazwa, opis } = data;
        
        const updateData = {};
        
        if (nazwa !== undefined) {
            if (nazwa.trim() === '') {
                throw new Error('Nazwa listy nie może być pusta');
            }
            updateData.nazwa = nazwa.trim();
        }
        
        if (opis !== undefined) {
            updateData.opis = opis ? opis.trim() : null;
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error('Brak danych do aktualizacji');
        }

        const updated = await TodoRepository.updateListaZadan(listaId, updateData);
        if (!updated) {
            throw new Error(`Nie znaleziono listy zadań o ID ${listaId}`);
        }
        
        return updated;
    }

    async deleteListaZadan(listaId) {
        const deleted = await TodoRepository.deleteListaZadan(listaId);
        if (!deleted) {
            throw new Error(`Nie znaleziono listy zadań o ID ${listaId}`);
        }
        
        return { message: 'Lista zadań została usunięta pomyślnie' };
    }

    async getZadaniaByUczenId(uczenId, filters = {}) {
        if (!uczenId) {
            throw new Error('ID ucznia jest wymagane');
        }
        return TodoRepository.getZadaniaByUczenId(uczenId, filters);
    }

    async getZadanieById(zadanieId) {
        const zadanie = await TodoRepository.getZadanieById(zadanieId);
        if (!zadanie) {
            throw new Error(`Nie znaleziono zadania o ID ${zadanieId}`);
        }
        return zadanie;
    }

    async createZadanie(data) {
        const { id_lista, id_ucznia, tytul, opis, termin, priorytet, id_statusu } = data;
        
        if (!id_lista) {
            throw new Error('ID listy jest wymagane');
        }
        
        if (!id_ucznia) {
            throw new Error('ID ucznia jest wymagane');
        }
        
        if (!tytul || tytul.trim() === '') {
            throw new Error('Tytuł zadania nie może być pusty');
        }

        const zadanieData = {
            id_lista,
            id_ucznia,
            tytul: tytul.trim(),
            opis: opis ? opis.trim() : null,
            priorytet: priorytet || 3,
            id_statusu: id_statusu || 1
        };

        if (termin) {
            zadanieData.termin = termin;
        }

        return TodoRepository.createZadanie(zadanieData);
    }

    async updateZadanie(zadanieId, data) {
        const { tytul, opis, termin, priorytet, id_statusu } = data;
        
        const updateData = {};
        
        if (tytul !== undefined) {
            if (tytul.trim() === '') {
                throw new Error('Tytuł zadania nie może być pusty');
            }
            updateData.tytul = tytul.trim();
        }
        
        if (opis !== undefined) {
            updateData.opis = opis ? opis.trim() : null;
        }
        
        if (termin !== undefined) {
            updateData.termin = termin;
        }
        
        if (priorytet !== undefined) {
            if (priorytet < 1 || priorytet > 5) {
                throw new Error('Priorytet musi być w zakresie 1-5');
            }
            updateData.priorytet = priorytet;
        }
        
        if (id_statusu !== undefined) {
            updateData.id_statusu = id_statusu;
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error('Brak danych do aktualizacji');
        }

        const updated = await TodoRepository.updateZadanie(zadanieId, updateData);
        if (!updated) {
            throw new Error(`Nie znaleziono zadania o ID ${zadanieId}`);
        }
        
        return updated;
    }

    async deleteZadanie(zadanieId) {
        const deleted = await TodoRepository.deleteZadanie(zadanieId, true);
        if (!deleted) {
            throw new Error(`Nie znaleziono zadania o ID ${zadanieId}`);
        }
        
        return { message: 'Zadanie zostało usunięte pomyślnie' };
    }

    async markZadanieAsCompleted(zadanieId) {
        const updated = await TodoRepository.markZadanieAsCompleted(zadanieId);
        if (!updated) {
            throw new Error(`Nie znaleziono zadania o ID ${zadanieId} lub statusu "wykonane"`);
        }
        
        return updated;
    }
}

module.exports = new TodoService();
