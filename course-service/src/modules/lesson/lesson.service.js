const LessonRepository = require('./lesson.repository');
const Grupa = require('../group/group.model');
const Kurs = require('../course/course.model');

class LessonService {
    async getAllForGroup(id) {
        return LessonRepository.findAllByGroup(id);
    }

    async getOne(id) {
        const zajecia = await LessonRepository.findOne(id);
        if (!zajecia) throw new Error("Zajęcia nie znalezione");
        return zajecia;
    }

    async create(data) {
        return LessonRepository.create(data);
    }

    async update(id, data) {
        return LessonRepository.update(id, data);
    }

    async delete(id) {
        return LessonRepository.delete(id);
    }

    async getLessonsForTeacherByMonth(teacherId, year, month) {
        return LessonRepository.findByTeacherAndMonth(teacherId, year, month);
    }

    async createLessonsForGroup(id_grupa) {
        try {
            const grupa = await Grupa.findByPk(id_grupa, {
                include: [{
                    model: Kurs,
                    as: 'kurs'
                }]
            });

            if (!grupa) throw new Error('Grupa nie znaleziona');
            if (!grupa.kurs) throw new Error('Kurs nie znaleziony dla grupy');

            const dataRozpoczecia = new Date(grupa.kurs.data_rozpoczecia);
            const dataZakonczenia = new Date(grupa.kurs.data_zakonczenia);
            const dzienTygodniaGrupy = grupa.dzien_tygodnia;
            const godzinaGrupy = grupa.godzina;

            const dniTygodniaMap = {
                'Niedziela': 0,
                'Poniedziałek': 1,
                'Wtorek': 2,
                'Środa': 3,
                'Czwartek': 4,
                'Piątek': 5,
                'Sobota': 6
            };

            const dzienTygodniaNumer = dniTygodniaMap[dzienTygodniaGrupy];
            if (dzienTygodniaNumer === undefined) {
                throw new Error(`Nieznany dzień tygodnia: ${dzienTygodniaGrupy}`);
            }

            const zajeciaDoUtworzenia = [];
            const currentDate = new Date(dataRozpoczecia);

            while (currentDate <= dataZakonczenia) {
                if (currentDate.getDay() === dzienTygodniaNumer) {
                    const zajecie = {
                        id_grupy: id_grupa,
                        Sala_id_sali: 1,
                        tematZajec: "Brak",
                        data: new Date(currentDate),
                        notatki_od_nauczyciela: "Brak"
                    };
                    zajeciaDoUtworzenia.push(zajecie);
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const createdLessons = [];
            for (const zajecieData of zajeciaDoUtworzenia) {
                const created = await LessonRepository.create(zajecieData);
                createdLessons.push(created);
            }

            return createdLessons;
        } catch (error) {
            console.error('Błąd podczas tworzenia zajęć:', error);
            throw error;
        }
    }
}

module.exports = new LessonService();