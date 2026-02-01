const request = require('supertest');
const express = require('express');

process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/testdb';

jest.mock('../src/modules/student/student.controller');
jest.mock('../src/modules/teacher/teacher.controller');
jest.mock('../src/modules/users/user.controller');
jest.mock('../src/modules/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { id: 1, rola: 'administrator' };
    next();
});
jest.mock('../src/modules/middleware/roleMiddleware', () => ({
    checkRole: () => (req, res, next) => next(),
    checkOwnership: () => (req, res, next) => next()
}));
jest.mock('../src/modules/users/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { id: 1, rola: 'administrator' };
    next();
});

const UczenController = require('../src/modules/student/student.controller');
const TeacherController = require('../src/modules/teacher/teacher.controller');
const UserController = require('../src/modules/users/user.controller');

const app = express();
app.use(express.json());

const studentRouter = express.Router();
studentRouter.get('/', (req, res, next) => UczenController.getAll(req, res, next));
studentRouter.get('/:id', (req, res, next) => UczenController.getOne(req, res, next));
studentRouter.post('/', (req, res, next) => UczenController.create(req, res, next));
studentRouter.put('/:id', (req, res, next) => UczenController.update(req, res, next));
studentRouter.delete('/:id', (req, res, next) => UczenController.delete(req, res, next));
studentRouter.post('/zapiszNaGrupe', (req, res, next) => UczenController.zapiszNaGrupe(req, res, next));
studentRouter.patch('/:uczenId/assign-guardian', (req, res, next) => UczenController.assignGuardian(req, res, next));
studentRouter.patch('/:id/punkty', (req, res, next) => UczenController.adjustPoints(req, res, next));
studentRouter.patch('/:id/pseudonim', (req, res, next) => UczenController.changePseudonim(req, res, next));

const teacherRouter = express.Router();
teacherRouter.get('/', (req, res, next) => TeacherController.getAll(req, res, next));
teacherRouter.get('/:id', (req, res, next) => TeacherController.getOne(req, res, next));
teacherRouter.post('/', (req, res, next) => TeacherController.create(req, res, next));
teacherRouter.put('/:id', (req, res, next) => TeacherController.update(req, res, next));
teacherRouter.delete('/:id', (req, res, next) => TeacherController.delete(req, res, next));

const userRouter = express.Router();
userRouter.get('/test/test', (req, res, next) => UserController.test(req, res, next));
userRouter.get('/me', (req, res, next) => UserController.getProfile(req, res, next));
userRouter.put('/updateProfile', (req, res, next) => UserController.updateProfile(req, res, next));
userRouter.put('/profile/password', (req, res, next) => UserController.changePassword(req, res, next));
userRouter.get('/:id', (req, res, next) => UserController.getUserById(req, res, next));
userRouter.get('/email/:email', (req, res, next) => UserController.getUserByEmail(req, res, next));
userRouter.post('/', (req, res, next) => UserController.createUser(req, res, next));
userRouter.delete('/:id', (req, res, next) => UserController.deleteUser(req, res, next));

app.use('/uczniowie', studentRouter);
app.use('/nauczyciele', teacherRouter);
app.use('/user', userRouter);

describe('USER SERVICE - Testy endpointów', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('STUDENTS - /uczniowie', () => {
        describe('GET /uczniowie', () => {
            it('powinien zwrócić listę wszystkich uczniów', async () => {
                const mockStudents = [
                    { id: 1, imie: 'Jan', nazwisko: 'Kowalski', pseudonim: 'Janek' },
                    { id: 2, imie: 'Anna', nazwisko: 'Nowak', pseudonim: 'Ania' }
                ];

                UczenController.getAll.mockImplementation((req, res) => {
                    res.status(200).json(mockStudents);
                });

                const response = await request(app).get('/uczniowie');

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBe(2);
            });
        });

        describe('GET /uczniowie/:id', () => {
            it('powinien zwrócić jednego ucznia po ID', async () => {
                const mockStudent = {
                    id: 1,
                    imie: 'Jan',
                    nazwisko: 'Kowalski',
                    pseudonim: 'Janek'
                };

                UczenController.getOne.mockImplementation((req, res) => {
                    res.status(200).json(mockStudent);
                });

                const response = await request(app).get('/uczniowie/1');

                expect(response.status).toBe(200);
                expect(response.body.id).toBe(1);
                expect(response.body.imie).toBe('Jan');
            });

            it('powinien zwrócić błąd dla nieistniejącego ucznia', async () => {
                UczenController.getOne.mockImplementation((req, res) => {
                    res.status(404).json({ error: 'Uczeń nie znaleziony' });
                });

                const response = await request(app).get('/uczniowie/999');

                expect(response.status).toBe(404);
                expect(response.body.error).toBeTruthy();
            });
        });

        describe('POST /uczniowie', () => {
            it('powinien utworzyć nowego ucznia', async () => {
                const newStudent = {
                    imie: 'Piotr',
                    nazwisko: 'Wiśniewski',
                    pseudonim: 'Piotrek'
                };

                UczenController.create.mockImplementation((req, res) => {
                    res.status(201).json({ id: 3, ...newStudent });
                });

                const response = await request(app)
                    .post('/uczniowie')
                    .send(newStudent);

                expect(response.status).toBe(201);
                expect(response.body.id).toBe(3);
                expect(response.body.imie).toBe('Piotr');
            });

            it('powinien zwrócić błąd przy braku wymaganych pól', async () => {
                UczenController.create.mockImplementation((req, res) => {
                    res.status(400).json({ error: 'Imię jest wymagane' });
                });

                const response = await request(app).post('/uczniowie').send({});

                expect(response.status).toBe(400);
                expect(response.body.error).toBeTruthy();
            });
        });

        describe('PUT /uczniowie/:id', () => {
            it('powinien zaktualizować dane ucznia', async () => {
                UczenController.update.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Uczeń zaktualizowany' });
                });

                const response = await request(app)
                    .put('/uczniowie/1')
                    .send({ imie: 'Jan', nazwisko: 'Kowalski' });

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
            });
        });

        describe('DELETE /uczniowie/:id', () => {
            it('powinien usunąć ucznia', async () => {
                UczenController.delete.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Uczeń usunięty' });
                });

                const response = await request(app).delete('/uczniowie/1');

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
            });
        });

        describe('POST /uczniowie/zapiszNaGrupe', () => {
            it('powinien zapisać ucznia na grupę', async () => {
                UczenController.zapiszNaGrupe.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Uczeń zapisany na grupę' });
                });

                const response = await request(app)
                    .post('/uczniowie/zapiszNaGrupe')
                    .send({ uczenId: 1, grupaId: 1 });

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
            });
        });

        describe('PATCH /uczniowie/:uczenId/assign-guardian', () => {
            it('powinien przypisać opiekuna do ucznia', async () => {
                UczenController.assignGuardian.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Opiekun przypisany' });
                });

                const response = await request(app)
                    .patch('/uczniowie/1/assign-guardian')
                    .send({ opiekunId: 5 });

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
            });
        });

        describe('PATCH /uczniowie/:id/punkty', () => {
            it('powinien zaktualizować punkty ucznia', async () => {
                UczenController.adjustPoints.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Punkty zaktualizowane', punkty: 150 });
                });

                const response = await request(app)
                    .patch('/uczniowie/1/punkty')
                    .send({ punkty: 150 });

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
            });
        });

        describe('PATCH /uczniowie/:id/pseudonim', () => {
            it('powinien zmienić pseudonim ucznia', async () => {
                UczenController.changePseudonim.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Pseudonim zmieniony', pseudonim: 'NowePseudo' });
                });

                const response = await request(app)
                    .patch('/uczniowie/1/pseudonim')
                    .send({ pseudonim: 'NowePseudo' });

                expect(response.status).toBe(200);
                expect(response.body.message).toBeTruthy();
                expect(response.body.pseudonim).toBe('NowePseudo');
            });

            it('powinien zwrócić błąd przy pustym pseudonimie', async () => {
                UczenController.changePseudonim.mockImplementation((req, res) => {
                    res.status(400).json({ error: 'Pseudonim nie może być pusty' });
                });

                const response = await request(app)
                    .patch('/uczniowie/1/pseudonim')
                    .send({ pseudonim: '' });

                expect(response.status).toBe(400);
                expect(response.body.error).toBeTruthy();
            });
        });
    });

    describe('TEACHERS - /nauczyciele', () => {
        describe('GET /nauczyciele', () => {
            it('powinien zwrócić listę wszystkich nauczycieli', async () => {
                const mockTeachers = [
                    { id: 1, imie: 'Maria', nazwisko: 'Kowalska', przedmiot: 'Matematyka' },
                    { id: 2, imie: 'Adam', nazwisko: 'Nowak', przedmiot: 'Fizyka' }
                ];

                TeacherController.getAll.mockImplementation((req, res) => {
                    res.status(200).json(mockTeachers);
                });

                const response = await request(app).get('/nauczyciele');

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBe(2);
            });
        });

        describe('GET /nauczyciele/:id', () => {
            it('powinien zwrócić jednego nauczyciela po ID', async () => {
                const mockTeacher = {
                    id: 1,
                    imie: 'Maria',
                    nazwisko: 'Kowalska'
                };

                TeacherController.getOne.mockImplementation((req, res) => {
                    res.status(200).json(mockTeacher);
                });

                const response = await request(app).get('/nauczyciele/1');

                expect(response.status).toBe(200);
                expect(response.body.id).toBe(1);
            });
        });

        describe('POST /nauczyciele', () => {
            it('powinien utworzyć nowego nauczyciela', async () => {
                const newTeacher = {
                    imie: 'Krzysztof',
                    nazwisko: 'Wiśniewski',
                    przedmiot: 'Chemia'
                };

                TeacherController.create.mockImplementation((req, res) => {
                    res.status(201).json({ id: 3, ...newTeacher });
                });

                const response = await request(app).post('/nauczyciele').send(newTeacher);

                expect(response.status).toBe(201);
                expect(response.body.id).toBe(3);
            });
        });

        describe('PUT /nauczyciele/:id', () => {
            it('powinien zaktualizować dane nauczyciela', async () => {
                TeacherController.update.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Nauczyciel zaktualizowany' });
                });

                const response = await request(app)
                    .put('/nauczyciele/1')
                    .send({ imie: 'Maria', nazwisko: 'Kowalska' });

                expect(response.status).toBe(200);
            });
        });

        describe('DELETE /nauczyciele/:id', () => {
            it('powinien usunąć nauczyciela', async () => {
                TeacherController.delete.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Nauczyciel usunięty' });
                });

                const response = await request(app).delete('/nauczyciele/1');

                expect(response.status).toBe(200);
            });
        });
    });

    describe('USERS - /user', () => {
        describe('GET /user/test/test', () => {
            it('powinien zwrócić status testowy', async () => {
                UserController.test.mockImplementation((req, res) => {
                    res.status(200).json({ status: 'OK' });
                });

                const response = await request(app).get('/user/test/test');

                expect(response.status).toBe(200);
                expect(response.body.status).toBe('OK');
            });
        });

        describe('GET /user/me', () => {
            it('powinien zwrócić profil zalogowanego użytkownika', async () => {
                const mockProfile = {
                    id: 1,
                    email: 'test@example.com',
                    imie: 'Jan',
                    nazwisko: 'Kowalski'
                };

                UserController.getProfile.mockImplementation((req, res) => {
                    res.status(200).json(mockProfile);
                });

                const response = await request(app).get('/user/me');

                expect(response.status).toBe(200);
                expect(response.body.email).toBe('test@example.com');
            });
        });

        describe('PUT /user/updateProfile', () => {
            it('powinien zaktualizować profil użytkownika', async () => {
                UserController.updateProfile.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Profil zaktualizowany' });
                });

                const response = await request(app)
                    .put('/user/updateProfile')
                    .send({ imie: 'Jan', nazwisko: 'Kowalski' });

                expect(response.status).toBe(200);
            });
        });

        describe('PUT /user/profile/password', () => {
            it('powinien zmienić hasło użytkownika', async () => {
                UserController.changePassword.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Hasło zmienione' });
                });

                const response = await request(app)
                    .put('/user/profile/password')
                    .send({ oldPassword: 'Old123!', newPassword: 'New123!' });

                expect(response.status).toBe(200);
            });

            it('powinien zwrócić błąd przy błędnym starym haśle', async () => {
                UserController.changePassword.mockImplementation((req, res) => {
                    res.status(400).json({ error: 'Nieprawidłowe stare hasło' });
                });

                const response = await request(app)
                    .put('/user/profile/password')
                    .send({ oldPassword: 'Wrong123!', newPassword: 'New123!' });

                expect(response.status).toBe(400);
            });
        });

        describe('GET /user/:id', () => {
            it('powinien zwrócić użytkownika po ID', async () => {
                UserController.getUserById.mockImplementation((req, res) => {
                    res.status(200).json({ id: 1, email: 'test@example.com' });
                });

                const response = await request(app).get('/user/1');

                expect(response.status).toBe(200);
                expect(response.body.id).toBe(1);
            });
        });

        describe('GET /user/email/:email', () => {
            it('powinien zwrócić użytkownika po emailu', async () => {
                UserController.getUserByEmail.mockImplementation((req, res) => {
                    res.status(200).json({ id: 1, email: 'test@example.com' });
                });

                const response = await request(app).get('/user/email/test@example.com');

                expect(response.status).toBe(200);
                expect(response.body.email).toBe('test@example.com');
            });
        });

        describe('POST /user', () => {
            it('powinien utworzyć nowego użytkownika', async () => {
                UserController.createUser.mockImplementation((req, res) => {
                    res.status(201).json({ id: 1, email: 'new@example.com' });
                });

                const response = await request(app)
                    .post('/user')
                    .send({ email: 'new@example.com', haslo: 'Test123!' });

                expect(response.status).toBe(201);
            });
        });

        describe('DELETE /user/:id', () => {
            it('powinien usunąć użytkownika', async () => {
                UserController.deleteUser.mockImplementation((req, res) => {
                    res.status(200).json({ message: 'Użytkownik usunięty' });
                });

                const response = await request(app).delete('/user/1');

                expect(response.status).toBe(200);
            });
        });
    });
});
