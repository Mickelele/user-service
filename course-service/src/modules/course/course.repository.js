const Kurs = require('./course.model');
const Grupa = require('../group/group.model');
const Nauczyciel = require('../../../../user-service/src/modules/teacher/teacher.model');
const User = require('../../../../user-service/src/modules/users/user.model');
const Zajecia = require('../lesson/lesson.model');
const Uczen = require('../group/student.model');
const Obecnosc = require('../presence/presence.model');
const { Op } = require('sequelize');
const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4000';

const CourseRepository = {
    async findAll() {
        return Kurs.findAll();
    },

    async findById(id) {
        return Kurs.findByPk(id);
    },

    async createCourse(data) {
        return Kurs.create(data);
    },

    async updateCourse(id, data) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Kurs nie znaleziony');
        return course.update(data);
    },

    async deleteCourse(id) {
        const course = await Kurs.findByPk(id);
        if (!course) throw new Error('Kurs nie znaleziony');
        
        // Pobierz wszystkie grupy przypisane do kursu
        const grupy = await Grupa.findAll({
            where: { Kurs_id_kursu: id }
        });
        
        // Usuń zajęcia dla każdej grupy, a następnie samą grupę
        for (const grupa of grupy) {
            await Zajecia.destroy({
                where: { id_grupy: grupa.id_grupa }
            });
            await grupa.destroy();
        }
        
        await course.destroy();
        return { message: 'Usunięto kurs wraz ze wszystkimi grupami i zajęciami' };
    },

    async findGroupsByCourseId(id) {
        const kurs = await Kurs.findByPk(id, {
            include: [
                {
                    model: Grupa,
                    as: 'grupy',
                    include: [{ model: Nauczyciel, as: 'nauczyciel' }]
                }
            ]
        });

        if (!kurs) throw new Error('Kurs nie znaleziony');

        const grupy = await Promise.all(kurs.grupy.map(async grupa => {
            const nauczyciel = grupa.nauczyciel;
            let userData = null;

            try {
                const response = await axios.get(`${USER_SERVICE_URL}/user/${nauczyciel.id_nauczyciela}`);
                userData = response.data;
            } catch (err) {
                console.warn(`Nie udało się pobrać danych użytkownika ${nauczyciel.id_nauczyciela}: ${err.message}`);
            }

            return {
                ...grupa.toJSON(),
                nauczyciel: {
                    ...nauczyciel.toJSON(),
                    uzytkownik: userData
                }
            };
        }));

        return grupy;
    },

    async findCoursesByTeacherId(teacherId, dzienTygodnia = null) {
        const groupWhere = {
            id_nauczyciela: teacherId
        };

        if (dzienTygodnia) {
            groupWhere.dzien_tygodnia = dzienTygodnia;
        }

        const kursy = await Kurs.findAll({
            include: [
                {
                    model: Grupa,
                    as: 'grupy',
                    where: groupWhere,
                    required: true,
                    include: [
                        {
                            model: Nauczyciel,
                            as: 'nauczyciel',
                            where: { id_nauczyciela: teacherId }
                        },
                        {
                            model: Zajecia,
                            as: 'zajecia',
                            order: [['data', 'ASC']]
                        }
                    ]
                }
            ],
            distinct: true
        });

        const kursyZPelnymiDanymi = await Promise.all(
            kursy.map(async (kurs) => {
                const grupyZDanymi = await Promise.all(
                    kurs.grupy.map(async (grupa) => {
                        const uczniowie = await Uczen.findAll({
                            where: { id_grupa: grupa.id_grupa }
                        });


                        const uczniowieZDanymi = await Promise.all(
                            uczniowie.map(async (uczen) => {
                                let userData = null;
                                try {
                                    const response = await axios.get(`${USER_SERVICE_URL}/user/${uczen.id_ucznia}`);
                                    userData = response.data;
                                } catch (err) {
                                    console.warn(`Nie udało się pobrać danych użytkownika ${uczen.id_ucznia}: ${err.message}`);
                                }

                                return {
                                    id_ucznia: uczen.id_ucznia,
                                    pseudonim: uczen.pseudonim,
                                    saldo_punktow: uczen.saldo_punktow,
                                    id_grupa: uczen.id_grupa,

                                    imie: userData?.imie || null,
                                    nazwisko: userData?.nazwisko || null,
                                    email: userData?.email || null
                                };
                            })
                        );

                        const zajeciaZObecnosciami = await Promise.all(
                            grupa.zajecia.map(async (zajecie) => {
                                const obecnosci = await Obecnosc.findAll({
                                    where: { id_zajec: zajecie.id_zajec },
                                    include: [
                                        {
                                            model: Uczen,
                                            as: 'uczen',
                                            attributes: ['id_ucznia', 'pseudonim']
                                        }
                                    ]
                                });

                                return {
                                    ...zajecie.toJSON(),
                                    obecnosci: obecnosci.map(obecnosc => ({
                                        id_obecnosci: obecnosc.id_obecnosci,
                                        id_ucznia: obecnosc.id_ucznia,
                                        id_zajec: obecnosc.id_zajec,
                                        czyObecny: obecnosc.czyObecny,
                                        uczen: obecnosc.uczen ? {
                                            id_ucznia: obecnosc.uczen.id_ucznia,
                                            pseudonim: obecnosc.uczen.pseudonim
                                        } : null
                                    }))
                                };
                            })
                        );

                        return {
                            ...grupa.toJSON(),
                            uczniowie: uczniowieZDanymi,
                            zajecia: zajeciaZObecnosciami
                        };
                    })
                );

                return {
                    ...kurs.toJSON(),
                    grupy: grupyZDanymi
                };
            })
        );

        return kursyZPelnymiDanymi;
    }
};

module.exports = CourseRepository;