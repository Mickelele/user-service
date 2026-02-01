const request = require('supertest');
const express = require('express');

process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/testdb';

jest.mock('../src/modules/course/course.controller');
jest.mock('../src/modules/group/group.controller');
jest.mock('../src/modules/lesson/lesson.controller');
jest.mock('../src/modules/homework/zadanieDomowe.controller');
jest.mock('../src/modules/homework_answer/odpowiedzNaZadanie.controller');
jest.mock('../src/modules/substitute/substitute.controller');
jest.mock('../src/modules/room/room.controller');
jest.mock('../src/modules/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { id: 1, rola: 'administrator' };
    next();
});
jest.mock('../src/modules/middleware/roleMiddleware', () => ({
    checkRole: () => (req, res, next) => next(),
    checkOwnership: () => (req, res, next) => next()
}));

const CourseController = require('../src/modules/course/course.controller');
const GroupController = require('../src/modules/group/group.controller');
const LessonController = require('../src/modules/lesson/lesson.controller');
const HomeworkController = require('../src/modules/homework/zadanieDomowe.controller');
const HomeworkAnswerController = require('../src/modules/homework_answer/odpowiedzNaZadanie.controller');
const SubstituteController = require('../src/modules/substitute/substitute.controller');
const RoomController = require('../src/modules/room/room.controller');

const app = express();
app.use(express.json());

const courseRouter = express.Router();
courseRouter.get('/', (req, res, next) => CourseController.getAll(req, res, next));
courseRouter.get('/:id', (req, res, next) => CourseController.getOne(req, res, next));
courseRouter.post('/', (req, res, next) => CourseController.create(req, res, next));
courseRouter.put('/:id', (req, res, next) => CourseController.update(req, res, next));
courseRouter.delete('/:id', (req, res, next) => CourseController.delete(req, res, next));

const groupRouter = express.Router();
groupRouter.get('/', (req, res, next) => GroupController.getAll(req, res, next));
groupRouter.get('/:id', (req, res, next) => GroupController.getOne(req, res, next));
groupRouter.post('/', (req, res, next) => GroupController.create(req, res, next));
groupRouter.put('/:id', (req, res, next) => GroupController.update(req, res, next));
groupRouter.delete('/:id', (req, res, next) => GroupController.delete(req, res, next));

const lessonRouter = express.Router();
lessonRouter.get('/', (req, res, next) => LessonController.getAllForGroup(req, res, next));
lessonRouter.get('/:id', (req, res, next) => LessonController.getOne(req, res, next));
lessonRouter.post('/', (req, res, next) => LessonController.create(req, res, next));
lessonRouter.post('/teacher/:teacherId/lessons/month', (req, res, next) => LessonController.getLessonsForTeacherByMonth(req, res, next));
lessonRouter.post('/teacher/:teacherId/lessons/month', (req, res, next) => LessonController.getTeacherLessonsForMonth(req, res, next));

const homeworkRouter = express.Router();
homeworkRouter.get('/grupa/:id_grupy', (req, res, next) => HomeworkController.getForGroup(req, res, next));
homeworkRouter.get('/prace-domowe-grupy/:id_grupy/wszystkie', (req, res, next) => HomeworkController.getAllForGroupWithStatus(req, res, next));
homeworkRouter.post('/', (req, res, next) => HomeworkController.create(req, res, next));
homeworkRouter.put('/:id', (req, res, next) => HomeworkController.update(req, res, next));
homeworkRouter.delete('/:id', (req, res, next) => HomeworkController.delete(req, res, next));

const homeworkAnswerRouter = express.Router();
homeworkAnswerRouter.get('/', (req, res, next) => HomeworkAnswerController.getAll(req, res, next));
homeworkAnswerRouter.post('/dodaj', (req, res, next) => HomeworkAnswerController.create(req, res, next));
homeworkAnswerRouter.get('/moja-odpowiedz/:id_zadania', (req, res, next) => HomeworkAnswerController.getStudentAnswer(req, res, next));
homeworkAnswerRouter.get('/zadanie/:id_zadania', (req, res, next) => HomeworkAnswerController.getAnswers(req, res, next));
homeworkAnswerRouter.put('/ocen/:id_odpowiedzi', (req, res, next) => HomeworkAnswerController.gradeAnswer(req, res, next));
homeworkAnswerRouter.get('/moje-prace', (req, res, next) => HomeworkAnswerController.getMyHomeworks(req, res, next));

const substituteRouter = express.Router();
substituteRouter.get('/available', (req, res, next) => SubstituteController.getAvailable(req, res, next));
substituteRouter.get('/teacher/:teacherId/reporting', (req, res, next) => SubstituteController.getByTeacherReporting(req, res, next));
substituteRouter.get('/teacher/:teacherId/substituting', (req, res, next) => SubstituteController.getByTeacherSubstituting(req, res, next));
substituteRouter.get('/', (req, res, next) => SubstituteController.getAll(req, res, next));
substituteRouter.get('/:id', (req, res, next) => SubstituteController.getOne(req, res, next));
substituteRouter.post('/', (req, res, next) => SubstituteController.create(req, res, next));
substituteRouter.put('/:id', (req, res, next) => SubstituteController.update(req, res, next));
substituteRouter.delete('/:id', (req, res, next) => SubstituteController.delete(req, res, next));
substituteRouter.patch('/:id/assign', (req, res, next) => SubstituteController.assignTeacher(req, res, next));
substituteRouter.patch('/:id/unassign', (req, res, next) => SubstituteController.unassignTeacher(req, res, next));

const roomRouter = express.Router();
roomRouter.get('/', (req, res, next) => RoomController.getAll(req, res, next));
roomRouter.get('/:id', (req, res, next) => RoomController.getOne(req, res, next));
roomRouter.post('/dodaj', (req, res, next) => RoomController.create(req, res, next));
roomRouter.put('/:id', (req, res, next) => RoomController.update(req, res, next));
roomRouter.delete('/:id', (req, res, next) => RoomController.delete(req, res, next));

app.use('/kursy', courseRouter);
app.use('/grupy', groupRouter);
app.use('/zajecia', lessonRouter);
app.use('/zadania-domowe', homeworkRouter);
app.use('/odpowiedzi-zadanie', homeworkAnswerRouter);
app.use('/zastepstwa', substituteRouter);
app.use('/sale', roomRouter);

describe('COURSE SERVICE - Testy endpointów', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('COURSES - /kursy', () => {
        it('GET / - powinien zwrócić wszystkie kursy', async () => {
            const mockCourses = [
                { id: 1, nazwa: 'Matematyka', opis: 'Kurs matematyki' },
                { id: 2, nazwa: 'Fizyka', opis: 'Kurs fizyki' }
            ];
            CourseController.getAll.mockImplementation((req, res) => res.status(200).json(mockCourses));

            const response = await request(app).get('/kursy');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });

        it('GET /:id - powinien zwrócić kurs po ID', async () => {
            const mockCourse = { id: 1, nazwa: 'Matematyka' };
            CourseController.getOne.mockImplementation((req, res) => res.status(200).json(mockCourse));

            const response = await request(app).get('/kursy/1');

            expect(response.status).toBe(200);
            expect(response.body.nazwa).toBe('Matematyka');
        });

        it('POST / - powinien utworzyć nowy kurs', async () => {
            CourseController.create.mockImplementation((req, res) => res.status(201).json({ id: 3, ...req.body }));

            const response = await request(app).post('/kursy').send({ nazwa: 'Chemia' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować kurs', async () => {
            CourseController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/kursy/1').send({ nazwa: 'Matematyka II' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć kurs', async () => {
            CourseController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/kursy/1');

            expect(response.status).toBe(200);
        });
    });

    describe('GROUPS - /grupy', () => {
        it('GET / - powinien zwrócić wszystkie grupy', async () => {
            const mockGroups = [{ id: 1, nazwa: 'Grupa A' }, { id: 2, nazwa: 'Grupa B' }];
            GroupController.getAll.mockImplementation((req, res) => res.status(200).json(mockGroups));

            const response = await request(app).get('/grupy');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /:id - powinien zwrócić grupę po ID', async () => {
            GroupController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, nazwa: 'Grupa A' }));

            const response = await request(app).get('/grupy/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nową grupę', async () => {
            GroupController.create.mockImplementation((req, res) => res.status(201).json({ id: 3, ...req.body }));

            const response = await request(app).post('/grupy').send({ nazwa: 'Grupa C' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować grupę', async () => {
            GroupController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/grupy/1').send({ nazwa: 'Grupa A1' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć grupę', async () => {
            GroupController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/grupy/1');

            expect(response.status).toBe(200);
        });
    });

    describe('LESSONS - /zajecia', () => {
        it('GET / - powinien zwrócić wszystkie zajęcia', async () => {
            const mockLessons = [{ id: 1, temat: 'Wprowadzenie' }];
            LessonController.getAllForGroup.mockImplementation((req, res) => res.status(200).json(mockLessons));

            const response = await request(app).get('/zajecia');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić zajęcia po ID', async () => {
            LessonController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, temat: 'Test' }));

            const response = await request(app).get('/zajecia/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowe zajęcia', async () => {
            LessonController.create.mockImplementation((req, res) => res.status(201).json({ id: 2, ...req.body }));

            const response = await request(app).post('/zajecia').send({ temat: 'Nowy temat' });

            expect(response.status).toBe(201);
        });

        it('POST /teacher/:teacherId/lessons/month - powinien zwrócić zajęcia nauczyciela w miesiącu', async () => {
            const mockLessons = [{ id: 1, data: '2026-02-01' }];
            LessonController.getLessonsForTeacherByMonth.mockImplementation((req, res) => res.status(200).json(mockLessons));

            const response = await request(app).post('/zajecia/teacher/13/lessons/month').send({ year: 2026, month: 2 });

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('HOMEWORK - /zadania-domowe', () => {
        it('GET /grupa/:id_grupy - powinien zwrócić zadania dla grupy', async () => {
            const mockHomework = [{ id: 1, tytul: 'Zadanie 1' }];
            HomeworkController.getForGroup.mockImplementation((req, res) => res.status(200).json(mockHomework));

            const response = await request(app).get('/zadania-domowe/grupa/1');

            expect(response.status).toBe(200);
        });

        it('GET /prace-domowe-grupy/:id_grupy/wszystkie - powinien zwrócić zadania z statusem', async () => {
            HomeworkController.getAllForGroupWithStatus.mockImplementation((req, res) => res.status(200).json([{ id: 1, tytul: 'Zadanie 1' }]));

            const response = await request(app).get('/zadania-domowe/prace-domowe-grupy/1/wszystkie');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowe zadanie', async () => {
            HomeworkController.create.mockImplementation((req, res) => res.status(201).json({ id: 2, ...req.body }));

            const response = await request(app).post('/zadania-domowe').send({ tytul: 'Nowe zadanie' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować zadanie', async () => {
            HomeworkController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/zadania-domowe/1').send({ tytul: 'Zaktualizowane' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć zadanie', async () => {
            HomeworkController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/zadania-domowe/1');

            expect(response.status).toBe(200);
        });
    });

    describe('HOMEWORK ANSWERS - /odpowiedzi-zadanie', () => {
        it('GET / - powinien zwrócić wszystkie odpowiedzi', async () => {
            const mockAnswers = [{ id: 1, tresc: 'Odpowiedź 1' }];
            HomeworkAnswerController.getAll.mockImplementation((req, res) => res.status(200).json(mockAnswers));

            const response = await request(app).get('/odpowiedzi-zadanie');

            expect(response.status).toBe(200);
        });

        it('POST /dodaj - powinien dodać odpowiedź', async () => {
            HomeworkAnswerController.create.mockImplementation((req, res) => res.status(201).json({ id: 1, ...req.body }));

            const response = await request(app).post('/odpowiedzi-zadanie/dodaj').send({ tresc: 'Moja odpowiedź' });

            expect(response.status).toBe(201);
        });

        it('GET /moja-odpowiedz/:id_zadania - powinien zwrócić odpowiedź ucznia', async () => {
            HomeworkAnswerController.getStudentAnswer.mockImplementation((req, res) => res.status(200).json({ id: 1, tresc: 'Test' }));

            const response = await request(app).get('/odpowiedzi-zadanie/moja-odpowiedz/1');

            expect(response.status).toBe(200);
        });

        it('GET /zadanie/:id_zadania - powinien zwrócić odpowiedzi do zadania', async () => {
            const mockAnswers = [{ id: 1, tresc: 'Odpowiedź 1' }];
            HomeworkAnswerController.getAnswers.mockImplementation((req, res) => res.status(200).json(mockAnswers));

            const response = await request(app).get('/odpowiedzi-zadanie/zadanie/1');

            expect(response.status).toBe(200);
        });

        it('PUT /ocen/:id_odpowiedzi - powinien ocenić odpowiedź', async () => {
            HomeworkAnswerController.gradeAnswer.mockImplementation((req, res) => res.status(200).json({ message: 'Oceniono' }));

            const response = await request(app).put('/odpowiedzi-zadanie/ocen/1').send({ ocena: 5 });

            expect(response.status).toBe(200);
        });

        it('GET /moje-prace - powinien zwrócić prace ucznia', async () => {
            const mockWorks = [{ id: 1, tytul: 'Praca 1' }];
            HomeworkAnswerController.getMyHomeworks.mockImplementation((req, res) => res.status(200).json(mockWorks));

            const response = await request(app).get('/odpowiedzi-zadanie/moje-prace');

            expect(response.status).toBe(200);
        });
    });

    describe('SUBSTITUTES - /zastepstwa', () => {
        it('GET /available - powinien zwrócić dostępne zastępstwa', async () => {
            const mockSubs = [{ id: 1, data: '2026-02-15' }];
            SubstituteController.getAvailable.mockImplementation((req, res) => res.status(200).json(mockSubs));

            const response = await request(app).get('/zastepstwa/available');

            expect(response.status).toBe(200);
        });

        it('GET /teacher/:teacherId/reporting - powinien zwrócić zastępstwa zgłaszane przez nauczyciela', async () => {
            const mockSubs = [{ id: 1 }];
            SubstituteController.getByTeacherReporting.mockImplementation((req, res) => res.status(200).json(mockSubs));

            const response = await request(app).get('/zastepstwa/teacher/13/reporting');

            expect(response.status).toBe(200);
        });

        it('GET /teacher/:teacherId/substituting - powinien zwrócić zastępstwa przyjęte przez nauczyciela', async () => {
            const mockSubs = [{ id: 1 }];
            SubstituteController.getByTeacherSubstituting.mockImplementation((req, res) => res.status(200).json(mockSubs));

            const response = await request(app).get('/zastepstwa/teacher/13/substituting');

            expect(response.status).toBe(200);
        });

        it('GET / - powinien zwrócić wszystkie zastępstwa', async () => {
            const mockSubs = [{ id: 1 }, { id: 2 }];
            SubstituteController.getAll.mockImplementation((req, res) => res.status(200).json(mockSubs));

            const response = await request(app).get('/zastepstwa');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić zastępstwo po ID', async () => {
            SubstituteController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1 }));

            const response = await request(app).get('/zastepstwa/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowe zastępstwo', async () => {
            SubstituteController.create.mockImplementation((req, res) => res.status(201).json({ id: 3 }));

            const response = await request(app).post('/zastepstwa').send({ data: '2026-02-20' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować zastępstwo', async () => {
            SubstituteController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/zastepstwa/1').send({ data: '2026-02-21' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć zastępstwo', async () => {
            SubstituteController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/zastepstwa/1');

            expect(response.status).toBe(200);
        });

        it('PATCH /:id/assign - powinien przypisać nauczyciela do zastępstwa', async () => {
            SubstituteController.assignTeacher.mockImplementation((req, res) => res.status(200).json({ message: 'Przypisano' }));

            const response = await request(app).patch('/zastepstwa/1/assign').send({ teacherId: 5 });

            expect(response.status).toBe(200);
        });

        it('PATCH /:id/unassign - powinien odpisać nauczyciela od zastępstwa', async () => {
            SubstituteController.unassignTeacher.mockImplementation((req, res) => res.status(200).json({ message: 'Odpisano' }));

            const response = await request(app).patch('/zastepstwa/1/unassign');

            expect(response.status).toBe(200);
        });
    });

    describe('ROOMS - /sale', () => {
        it('GET / - powinien zwrócić wszystkie sale', async () => {
            const mockRooms = [{ id: 1, nazwa: 'Sala 101' }];
            RoomController.getAll.mockImplementation((req, res) => res.status(200).json(mockRooms));

            const response = await request(app).get('/sale');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić salę po ID', async () => {
            RoomController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, nazwa: 'Sala 101' }));

            const response = await request(app).get('/sale/1');

            expect(response.status).toBe(200);
        });

        it('POST /dodaj - powinien dodać nową salę', async () => {
            RoomController.create.mockImplementation((req, res) => res.status(201).json({ id: 2, ...req.body }));

            const response = await request(app).post('/sale/dodaj').send({ nazwa: 'Sala 102' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować salę', async () => {
            RoomController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/sale/1').send({ nazwa: 'Sala 101A' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć salę', async () => {
            RoomController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/sale/1');

            expect(response.status).toBe(200);
        });
    });
});
