const SubstituteRepository = require('./substitute.repository');

class SubstituteService {
    async getAll() {
        return await SubstituteRepository.findAll();
    }

    async getOne(id) {
        const zastepstwo = await SubstituteRepository.findById(id);
        if (!zastepstwo) throw new Error('Zastępstwo nie znalezione');
        return zastepstwo;
    }

    async create(data) {
        const { Zajecia_id_zajec, id_nauczyciela_zglaszajacego } = data;
        
        if (!Zajecia_id_zajec || !id_nauczyciela_zglaszajacego) {
            throw new Error('Brak wymaganych danych');
        }

        return await SubstituteRepository.create({
            Zajecia_id_zajec,
            id_nauczyciela_zglaszajacego,
            id_nauczyciel_zastepujacy: null
        });
    }

    async update(id, data) {
        return await SubstituteRepository.update(id, data);
    }

    async delete(id) {
        return await SubstituteRepository.delete(id);
    }

    async getByTeacherReporting(id_nauczyciela) {
        return await SubstituteRepository.findByTeacherReporting(id_nauczyciela);
    }

    async getByTeacherSubstituting(id_nauczyciela) {
        return await SubstituteRepository.findByTeacherSubstituting(id_nauczyciela);
    }

    async getAvailable() {
        return await SubstituteRepository.findAvailable();
    }

    async assignTeacher(id_zastepstwa, id_nauczyciel_zastepujacy) {
        if (!id_nauczyciel_zastepujacy) {
            throw new Error('ID nauczyciela zastępującego jest wymagane');
        }

        const zastepstwo = await SubstituteRepository.findById(id_zastepstwa);
        if (!zastepstwo) throw new Error('Zastępstwo nie znalezione');

        if (zastepstwo.id_nauczyciel_zastepujacy) {
            throw new Error('To zastępstwo ma już przypisanego nauczyciela');
        }

        if (zastepstwo.id_nauczyciela_zglaszajacego === id_nauczyciel_zastepujacy) {
            throw new Error('Nauczyciel nie może zastąpić sam siebie');
        }

        return await SubstituteRepository.assignTeacher(id_zastepstwa, id_nauczyciel_zastepujacy);
    }

    async unassignTeacher(id_zastepstwa) {
        return await SubstituteRepository.assignTeacher(id_zastepstwa, null);
    }
}

module.exports = new SubstituteService();
