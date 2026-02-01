process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/testdb';

const request = require('supertest');
const express = require('express');

jest.mock('../src/modules/quiz/quiz.controller');
jest.mock('../src/modules/question/question.controller');
jest.mock('../src/modules/answer/answer.controller');
jest.mock('../src/modules/quizResult/wynikQuizu.controller');
jest.mock('../src/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { id: 1, id_ucznia: 1, id_nauczyciela: 1, rola: 'administrator' };
    next();
});
jest.mock('../src/middleware/roleMiddleware', () => ({
    checkRole: () => (req, res, next) => next(),
    checkGuardianStudent: () => (req, res, next) => next(),
    checkTeacherStudent: () => (req, res, next) => next()
}));

const QuizController = require('../src/modules/quiz/quiz.controller');
const QuestionController = require('../src/modules/question/question.controller');
const AnswerController = require('../src/modules/answer/answer.controller');
const WynikQuizuController = require('../src/modules/quizResult/wynikQuizu.controller');

const app = express();
app.use(express.json());

const quizRouter = express.Router();
quizRouter.get('/', (req, res, next) => QuizController.getAll(req, res, next));
quizRouter.get('/zajecia/:lessonId', (req, res, next) => QuizController.getByLesson(req, res, next));
quizRouter.get('/grupa/:groupId', (req, res, next) => QuizController.getByGroup(req, res, next));
quizRouter.get('/:id', (req, res, next) => QuizController.getOne(req, res, next));
quizRouter.post('/', (req, res, next) => QuizController.create(req, res, next));
quizRouter.put('/:id', (req, res, next) => QuizController.update(req, res, next));
quizRouter.delete('/:id', (req, res, next) => QuizController.delete(req, res, next));

const questionRouter = express.Router();
questionRouter.get('/', (req, res, next) => QuestionController.getAll(req, res, next));
questionRouter.get('/test', (req, res, next) => QuestionController.test(req, res, next));
questionRouter.get('/quiz/:quizId', (req, res, next) => QuestionController.getByQuiz(req, res, next));
questionRouter.get('/:id', (req, res, next) => QuestionController.getOne(req, res, next));
questionRouter.post('/', (req, res, next) => QuestionController.create(req, res, next));
questionRouter.put('/:id', (req, res, next) => QuestionController.update(req, res, next));
questionRouter.delete('/:id', (req, res, next) => QuestionController.delete(req, res, next));

const answerRouter = express.Router();
answerRouter.get('/', (req, res, next) => AnswerController.getAll(req, res, next));
answerRouter.get('/pytanie/:questionId', (req, res, next) => AnswerController.getByQuestion(req, res, next));
answerRouter.get('/:id', (req, res, next) => AnswerController.getOne(req, res, next));
answerRouter.post('/', (req, res, next) => AnswerController.create(req, res, next));
answerRouter.put('/:id', (req, res, next) => AnswerController.update(req, res, next));
answerRouter.delete('/:id', (req, res, next) => AnswerController.delete(req, res, next));

const wynikQuizuRouter = express.Router();
wynikQuizuRouter.get('/', (req, res, next) => WynikQuizuController.getAll(req, res, next));
wynikQuizuRouter.get('/uczen/:studentId', (req, res, next) => WynikQuizuController.getByStudent(req, res, next));
wynikQuizuRouter.get('/quiz/:quizId', (req, res, next) => WynikQuizuController.getByQuiz(req, res, next));
wynikQuizuRouter.get('/:id', (req, res, next) => WynikQuizuController.getOne(req, res, next));
wynikQuizuRouter.post('/', (req, res, next) => WynikQuizuController.create(req, res, next));
wynikQuizuRouter.put('/:id', (req, res, next) => WynikQuizuController.update(req, res, next));
wynikQuizuRouter.delete('/:id', (req, res, next) => WynikQuizuController.delete(req, res, next));

app.use('/quizy', quizRouter);
app.use('/pytania', questionRouter);
app.use('/odpowiedzi', answerRouter);
app.use('/wyniki-quizu', wynikQuizuRouter);

describe('QUIZ SERVICE - Testy endpointów', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('QUIZZES - /quizy', () => {
        it('GET / - powinien zwrócić wszystkie quizy', async () => {
            const mockQuizzes = [{ id: 1, tytul: 'Quiz 1' }, { id: 2, tytul: 'Quiz 2' }];
            QuizController.getAll.mockImplementation((req, res) => res.status(200).json(mockQuizzes));

            const response = await request(app).get('/quizy');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /zajecia/:lessonId - powinien zwrócić quizy dla zajęć', async () => {
            const mockQuizzes = [{ id: 1, tytul: 'Quiz 1' }];
            QuizController.getByLesson.mockImplementation((req, res) => res.status(200).json(mockQuizzes));

            const response = await request(app).get('/quizy/zajecia/1');

            expect(response.status).toBe(200);
        });

        it('GET /grupa/:groupId - powinien zwrócić quizy dla grupy', async () => {
            const mockQuizzes = [{ id: 1, tytul: 'Quiz 1' }];
            QuizController.getByGroup.mockImplementation((req, res) => res.status(200).json(mockQuizzes));

            const response = await request(app).get('/quizy/grupa/1');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić quiz po ID', async () => {
            QuizController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, tytul: 'Quiz 1' }));

            const response = await request(app).get('/quizy/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowy quiz', async () => {
            QuizController.create.mockImplementation((req, res) => res.status(201).json({ id: 1, tytul: 'Nowy Quiz' }));

            const response = await request(app).post('/quizy').send({ tytul: 'Nowy Quiz' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować quiz', async () => {
            QuizController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/quizy/1').send({ tytul: 'Zaktualizowany Quiz' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć quiz', async () => {
            QuizController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/quizy/1');

            expect(response.status).toBe(200);
        });
    });

    describe('QUESTIONS - /pytania', () => {
        it('GET / - powinien zwrócić wszystkie pytania', async () => {
            const mockQuestions = [{ id: 1, tresc: 'Pytanie 1' }, { id: 2, tresc: 'Pytanie 2' }];
            QuestionController.getAll.mockImplementation((req, res) => res.status(200).json(mockQuestions));

            const response = await request(app).get('/pytania');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /test - powinien zwrócić test', async () => {
            QuestionController.test.mockImplementation((req, res) => res.status(200).json({ message: 'Test OK' }));

            const response = await request(app).get('/pytania/test');

            expect(response.status).toBe(200);
        });

        it('GET /quiz/:quizId - powinien zwrócić pytania dla quizu', async () => {
            const mockQuestions = [{ id: 1, tresc: 'Pytanie 1' }];
            QuestionController.getByQuiz.mockImplementation((req, res) => res.status(200).json(mockQuestions));

            const response = await request(app).get('/pytania/quiz/1');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić pytanie po ID', async () => {
            QuestionController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, tresc: 'Pytanie 1' }));

            const response = await request(app).get('/pytania/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowe pytanie', async () => {
            QuestionController.create.mockImplementation((req, res) => res.status(201).json({ id: 1, tresc: 'Nowe pytanie' }));

            const response = await request(app).post('/pytania').send({ tresc: 'Nowe pytanie' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować pytanie', async () => {
            QuestionController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/pytania/1').send({ tresc: 'Zaktualizowane pytanie' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć pytanie', async () => {
            QuestionController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/pytania/1');

            expect(response.status).toBe(200);
        });
    });

    describe('ANSWERS - /odpowiedzi', () => {
        it('GET / - powinien zwrócić wszystkie odpowiedzi', async () => {
            const mockAnswers = [{ id: 1, tresc: 'Odpowiedź 1' }, { id: 2, tresc: 'Odpowiedź 2' }];
            AnswerController.getAll.mockImplementation((req, res) => res.status(200).json(mockAnswers));

            const response = await request(app).get('/odpowiedzi');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /pytanie/:questionId - powinien zwrócić odpowiedzi dla pytania', async () => {
            const mockAnswers = [{ id: 1, tresc: 'Odpowiedź 1' }];
            AnswerController.getByQuestion.mockImplementation((req, res) => res.status(200).json(mockAnswers));

            const response = await request(app).get('/odpowiedzi/pytanie/1');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić odpowiedź po ID', async () => {
            AnswerController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, tresc: 'Odpowiedź 1' }));

            const response = await request(app).get('/odpowiedzi/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nową odpowiedź', async () => {
            AnswerController.create.mockImplementation((req, res) => res.status(201).json({ id: 1, tresc: 'Nowa odpowiedź' }));

            const response = await request(app).post('/odpowiedzi').send({ tresc: 'Nowa odpowiedź' });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować odpowiedź', async () => {
            AnswerController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/odpowiedzi/1').send({ tresc: 'Zaktualizowana odpowiedź' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć odpowiedź', async () => {
            AnswerController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/odpowiedzi/1');

            expect(response.status).toBe(200);
        });
    });

    describe('QUIZ RESULTS - /wyniki-quizu', () => {
        it('GET / - powinien zwrócić wszystkie wyniki', async () => {
            const mockResults = [{ id: 1, wynik: 80 }, { id: 2, wynik: 90 }];
            WynikQuizuController.getAll.mockImplementation((req, res) => res.status(200).json(mockResults));

            const response = await request(app).get('/wyniki-quizu');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /uczen/:studentId - powinien zwrócić wyniki ucznia', async () => {
            const mockResults = [{ id: 1, wynik: 80 }];
            WynikQuizuController.getByStudent.mockImplementation((req, res) => res.status(200).json(mockResults));

            const response = await request(app).get('/wyniki-quizu/uczen/1');

            expect(response.status).toBe(200);
        });

        it('GET /quiz/:quizId - powinien zwrócić wyniki quizu', async () => {
            const mockResults = [{ id: 1, wynik: 80 }];
            WynikQuizuController.getByQuiz.mockImplementation((req, res) => res.status(200).json(mockResults));

            const response = await request(app).get('/wyniki-quizu/quiz/1');

            expect(response.status).toBe(200);
        });

        it('GET /:id - powinien zwrócić wynik po ID', async () => {
            WynikQuizuController.getOne.mockImplementation((req, res) => res.status(200).json({ id: 1, wynik: 80 }));

            const response = await request(app).get('/wyniki-quizu/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nowy wynik', async () => {
            WynikQuizuController.create.mockImplementation((req, res) => res.status(201).json({ id: 1, wynik: 85 }));

            const response = await request(app).post('/wyniki-quizu').send({ wynik: 85 });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować wynik', async () => {
            WynikQuizuController.update.mockImplementation((req, res) => res.status(200).json({ message: 'Zaktualizowano' }));

            const response = await request(app).put('/wyniki-quizu/1').send({ wynik: 90 });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć wynik', async () => {
            WynikQuizuController.delete.mockImplementation((req, res) => res.status(200).json({ message: 'Usunięto' }));

            const response = await request(app).delete('/wyniki-quizu/1');

            expect(response.status).toBe(200);
        });
    });
});
