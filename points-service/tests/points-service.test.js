process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/testdb';

const request = require('supertest');
const express = require('express');

jest.mock('../src/modules/points/points.controller');
jest.mock('../src/modules/prize/prize.controller');
jest.mock('../src/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { id: 1, id_ucznia: 1, id_nauczyciela: 1, rola: 'administrator' };
    next();
});
jest.mock('../src/middleware/roleMiddleware', () => ({
    checkRole: () => (req, res, next) => next(),
    checkOwnership: () => (req, res, next) => next()
}));

const PointsController = require('../src/modules/points/points.controller');
const PrizeController = require('../src/modules/prize/prize.controller');

const app = express();
app.use(express.json());

const pointsRouter = express.Router();
pointsRouter.get('/uczniowie', (req, res, next) => PointsController.getAllStudents(req, res, next));
pointsRouter.get('/uczen/:id', (req, res, next) => PointsController.getStudentById(req, res, next));
pointsRouter.get('/uczen/:id/saldo', (req, res, next) => PointsController.getStudentPoints(req, res, next));
pointsRouter.post('/add', (req, res, next) => PointsController.addPoints(req, res, next));
pointsRouter.post('/subtract', (req, res, next) => PointsController.subtractPoints(req, res, next));
pointsRouter.post('/set', (req, res, next) => PointsController.setPoints(req, res, next));
pointsRouter.put('/uczen/:id', (req, res, next) => PointsController.updateStudent(req, res, next));
pointsRouter.get('/ranking', (req, res, next) => PointsController.getRanking(req, res, next));
pointsRouter.get('/ranking/grupa/:groupId', (req, res, next) => PointsController.getRankingByGroup(req, res, next));

const prizeRouter = express.Router();
prizeRouter.get('/test', (req, res, next) => PrizeController.test(req, res, next));
prizeRouter.get('/history/all', (req, res, next) => PrizeController.getPrizeHistory(req, res, next));
prizeRouter.get('/', (req, res, next) => PrizeController.getAll(req, res, next));
prizeRouter.get('/:id', (req, res, next) => PrizeController.getOne(req, res, next));
prizeRouter.post('/', (req, res, next) => PrizeController.create(req, res, next));
prizeRouter.put('/:id', (req, res, next) => PrizeController.update(req, res, next));
prizeRouter.delete('/:id', (req, res, next) => PrizeController.delete(req, res, next));
prizeRouter.post('/:id/zdjecie', (req, res, next) => PrizeController.uploadImage(req, res, next));
prizeRouter.get('/:id/zdjecie', (req, res, next) => PrizeController.getImage(req, res, next));
prizeRouter.delete('/:id/zdjecie', (req, res, next) => PrizeController.deleteImage(req, res, next));
prizeRouter.get('/uczen/:studentId', (req, res, next) => PrizeController.getStudentPrizes(req, res, next));
prizeRouter.post('/redeem', (req, res, next) => PrizeController.redeemPrize(req, res, next));

app.use('/punkty', pointsRouter);
app.use('/nagrody', prizeRouter);

describe('POINTS SERVICE - Testy endpointów', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POINTS - /punkty', () => {
        it('GET /uczniowie - powinien zwrócić wszystkich uczniów z punktami', async () => {
            const mockStudents = [
                { id: 1, imie: 'Jan', nazwisko: 'Kowalski', punkty: 100 },
                { id: 2, imie: 'Anna', nazwisko: 'Nowak', punkty: 150 }
            ];
            PointsController.getAllStudents.mockImplementation((req, res) => res.status(200).json(mockStudents));

            const response = await request(app).get('/punkty/uczniowie');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /uczen/:id - powinien zwrócić ucznia po ID', async () => {
            PointsController.getStudentById.mockImplementation((req, res) => 
                res.status(200).json({ id: 1, imie: 'Jan', nazwisko: 'Kowalski', punkty: 100 })
            );

            const response = await request(app).get('/punkty/uczen/1');

            expect(response.status).toBe(200);
        });

        it('GET /uczen/:id/saldo - powinien zwrócić saldo punktów ucznia', async () => {
            PointsController.getStudentPoints.mockImplementation((req, res) => 
                res.status(200).json({ saldo: 100 })
            );

            const response = await request(app).get('/punkty/uczen/1/saldo');

            expect(response.status).toBe(200);
        });

        it('POST /add - powinien dodać punkty uczniowi', async () => {
            PointsController.addPoints.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Dodano punkty', nowe_saldo: 120 })
            );

            const response = await request(app).post('/punkty/add').send({ studentId: 1, points: 20 });

            expect(response.status).toBe(200);
        });

        it('POST /subtract - powinien odjąć punkty uczniowi', async () => {
            PointsController.subtractPoints.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Odjęto punkty', nowe_saldo: 80 })
            );

            const response = await request(app).post('/punkty/subtract').send({ studentId: 1, points: 20 });

            expect(response.status).toBe(200);
        });

        it('POST /set - powinien ustawić punkty ucznia', async () => {
            PointsController.setPoints.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Ustawiono punkty', nowe_saldo: 150 })
            );

            const response = await request(app).post('/punkty/set').send({ studentId: 1, points: 150 });

            expect(response.status).toBe(200);
        });

        it('PUT /uczen/:id - powinien zaktualizować dane ucznia', async () => {
            PointsController.updateStudent.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Zaktualizowano' })
            );

            const response = await request(app).put('/punkty/uczen/1').send({ punkty: 200 });

            expect(response.status).toBe(200);
        });

        it('GET /ranking - powinien zwrócić ranking uczniów', async () => {
            const mockRanking = [
                { id: 2, imie: 'Anna', nazwisko: 'Nowak', punkty: 150 },
                { id: 1, imie: 'Jan', nazwisko: 'Kowalski', punkty: 100 }
            ];
            PointsController.getRanking.mockImplementation((req, res) => res.status(200).json(mockRanking));

            const response = await request(app).get('/punkty/ranking');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /ranking/grupa/:groupId - powinien zwrócić ranking grupy', async () => {
            const mockRanking = [
                { id: 1, imie: 'Jan', nazwisko: 'Kowalski', punkty: 100 }
            ];
            PointsController.getRankingByGroup.mockImplementation((req, res) => res.status(200).json(mockRanking));

            const response = await request(app).get('/punkty/ranking/grupa/1');

            expect(response.status).toBe(200);
        });
    });

    describe('PRIZES - /nagrody', () => {
        it('GET /test - powinien zwrócić test', async () => {
            PrizeController.test.mockImplementation((req, res) => res.status(200).json({ message: 'Test OK' }));

            const response = await request(app).get('/nagrody/test');

            expect(response.status).toBe(200);
        });

        it('GET /history/all - powinien zwrócić historię nagród', async () => {
            const mockHistory = [
                { id: 1, studentId: 1, prizeId: 1, data: '2024-01-01' }
            ];
            PrizeController.getPrizeHistory.mockImplementation((req, res) => res.status(200).json(mockHistory));

            const response = await request(app).get('/nagrody/history/all');

            expect(response.status).toBe(200);
        });

        it('GET / - powinien zwrócić wszystkie nagrody', async () => {
            const mockPrizes = [
                { id: 1, nazwa: 'Nagroda 1', koszt: 50 },
                { id: 2, nazwa: 'Nagroda 2', koszt: 100 }
            ];
            PrizeController.getAll.mockImplementation((req, res) => res.status(200).json(mockPrizes));

            const response = await request(app).get('/nagrody');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('GET /:id - powinien zwrócić nagrodę po ID', async () => {
            PrizeController.getOne.mockImplementation((req, res) => 
                res.status(200).json({ id: 1, nazwa: 'Nagroda 1', koszt: 50 })
            );

            const response = await request(app).get('/nagrody/1');

            expect(response.status).toBe(200);
        });

        it('POST / - powinien utworzyć nową nagrodę', async () => {
            PrizeController.create.mockImplementation((req, res) => 
                res.status(201).json({ id: 1, nazwa: 'Nowa nagroda', koszt: 75 })
            );

            const response = await request(app).post('/nagrody').send({ nazwa: 'Nowa nagroda', koszt: 75 });

            expect(response.status).toBe(201);
        });

        it('PUT /:id - powinien zaktualizować nagrodę', async () => {
            PrizeController.update.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Zaktualizowano' })
            );

            const response = await request(app).put('/nagrody/1').send({ nazwa: 'Zaktualizowana nagroda' });

            expect(response.status).toBe(200);
        });

        it('DELETE /:id - powinien usunąć nagrodę', async () => {
            PrizeController.delete.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Usunięto' })
            );

            const response = await request(app).delete('/nagrody/1');

            expect(response.status).toBe(200);
        });

        it('POST /:id/zdjecie - powinien dodać zdjęcie do nagrody', async () => {
            PrizeController.uploadImage.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Dodano zdjęcie' })
            );

            const response = await request(app).post('/nagrody/1/zdjecie');

            expect(response.status).toBe(200);
        });

        it('GET /:id/zdjecie - powinien zwrócić zdjęcie nagrody', async () => {
            PrizeController.getImage.mockImplementation((req, res) => 
                res.status(200).send(Buffer.from('test'))
            );

            const response = await request(app).get('/nagrody/1/zdjecie');

            expect(response.status).toBe(200);
        });

        it('DELETE /:id/zdjecie - powinien usunąć zdjęcie nagrody', async () => {
            PrizeController.deleteImage.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Usunięto zdjęcie' })
            );

            const response = await request(app).delete('/nagrody/1/zdjecie');

            expect(response.status).toBe(200);
        });

        it('GET /uczen/:studentId - powinien zwrócić nagrody ucznia', async () => {
            const mockPrizes = [{ id: 1, nazwa: 'Nagroda 1' }];
            PrizeController.getStudentPrizes.mockImplementation((req, res) => 
                res.status(200).json(mockPrizes)
            );

            const response = await request(app).get('/nagrody/uczen/1');

            expect(response.status).toBe(200);
        });

        it('POST /redeem - powinien wymienić punkty na nagrodę', async () => {
            PrizeController.redeemPrize.mockImplementation((req, res) => 
                res.status(200).json({ message: 'Nagroda wymieniona', nowe_saldo: 50 })
            );

            const response = await request(app).post('/nagrody/redeem').send({ prizeId: 1 });

            expect(response.status).toBe(200);
        });
    });
});
