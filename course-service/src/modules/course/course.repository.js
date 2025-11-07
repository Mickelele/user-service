const Kurs = require('./course.model');
const Grupa = require('../group/group.model');
const Nauczyciel = require('../teacher/teacher.model');

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
        return course.destroy();
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
                const response = await axios.get(`${USER_SERVICE_URL}/uzytkownicy/${nauczyciel.id_nauczyciela}`);
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
    }



};

module.exports = CourseRepository;
