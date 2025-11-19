const CourseService = require('./course.service');

const CourseController = {
    async getAll(req, res) {
        try {
            const courses = await CourseService.getAll();
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const course = await CourseService.getOne(req.params.id);
            res.json(course);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newCourse = await CourseService.create(req.body);
            res.status(201).json(newCourse);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await CourseService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await CourseService.delete(req.params.id);
            res.json({ message: 'Usunięto kurs' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async findGroupsByCourseId(req, res) {
        try {
            const groups = await CourseService.findGroupsByCourseId(req.params.id);
            res.json(groups);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getMyCourses(req, res) {
        try {
            console.log('User data from JWT:', req.user);
            const teacherId = req.user.id;

            if (!teacherId) {
                return res.status(403).json({
                    error: 'Brak identyfikatora nauczyciela w tokenie'
                });
            }

            const dzienTygodnia = req.query.dzien;
            console.log(`Pobieranie pełnych danych kursów dla nauczyciela ID: ${teacherId}, dzień: ${dzienTygodnia || 'wszystkie'}`);

            const courses = await CourseService.getCoursesByTeacher(teacherId, dzienTygodnia);

            const coursesWithStats = courses.map(course => {
                const stats = {
                    totalGroups: course.grupy.length,
                    totalLessons: course.grupy.reduce((sum, grupa) => sum + grupa.zajecia.length, 0),
                    totalStudents: course.grupy.reduce((sum, grupa) => sum + grupa.uczniowie.length, 0)
                };

                return {
                    ...course,
                    stats
                };
            });

            res.json(coursesWithStats);
        } catch (err) {
            console.error('Błąd pobierania pełnych danych kursów nauczyciela:', err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = CourseController;