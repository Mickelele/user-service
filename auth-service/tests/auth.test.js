const request = require('supertest');
const express = require('express');
const authRoutes = require('../src/auth/auth.routes');
const AuthService = require('../src/auth/auth.service');

jest.mock('../src/auth/auth.service');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('AUTH SERVICE - Testy endpointów', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /auth/register', () => {
        it('powinien zarejestrować nowego użytkownika', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                imie: 'Jan',
                nazwisko: 'Kowalski'
            };

            AuthService.register.mockResolvedValue({
                success: true,
                user: mockUser,
                message: 'Użytkownik zarejestrowany'
            });

            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'test@example.com',
                    haslo: 'Test123!',
                    imie: 'Jan',
                    nazwisko: 'Kowalski',
                    rola: 'uczen'
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.user.email).toBe('test@example.com');
        });

        it('powinien zwrócić błąd przy braku danych', async () => {
            AuthService.register.mockRejectedValue(new Error('Email jest wymagany'));

            const response = await request(app)
                .post('/auth/register')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBeTruthy();
        });

        it('powinien zwrócić błąd przy istniejącym emailu', async () => {
            AuthService.register.mockRejectedValue(new Error('Użytkownik o takim emailu już istnieje'));

            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'existing@example.com',
                    haslo: 'Test123!',
                    imie: 'Jan',
                    nazwisko: 'Kowalski',
                    rola: 'uczen'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toContain('już istnieje');
        });
    });

    describe('POST /auth/login', () => {
        it('powinien zalogować użytkownika z poprawnymi danymi', async () => {
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                imie: 'Jan',
                nazwisko: 'Kowalski',
                rola: 'uczen'
            };

            AuthService.login.mockResolvedValue({
                success: true,
                token: mockToken,
                user: mockUser
            });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    haslo: 'Test123!'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.token).toBe(mockToken);
            expect(response.body.user.email).toBe('test@example.com');
        });

        it('powinien zwrócić błąd przy błędnym haśle', async () => {
            AuthService.login.mockRejectedValue(new Error('Nieprawidłowe hasło'));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    haslo: 'WrongPassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toContain('hasło');
        });

        it('powinien zwrócić błąd przy nieistniejącym użytkowniku', async () => {
            AuthService.login.mockRejectedValue(new Error('Użytkownik nie znaleziony'));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    haslo: 'Test123!'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toBeTruthy();
        });

        it('powinien zwrócić błąd przy braku emaila', async () => {
            AuthService.login.mockRejectedValue(new Error('Email jest wymagany'));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    haslo: 'Test123!'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('POST /auth/verify', () => {
        it('powinien zweryfikować poprawny token', async () => {
            const mockToken = 'valid.jwt.token';
            const mockData = {
                id: 1,
                email: 'test@example.com',
                rola: 'uczen'
            };

            AuthService.verifyToken.mockReturnValue(mockData);

            const response = await request(app)
                .post('/auth/verify')
                .send({ token: mockToken });

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.email).toBe('test@example.com');
        });

        it('powinien zwrócić błąd przy nieprawidłowym tokenie', async () => {
            AuthService.verifyToken.mockReturnValue(null);

            const response = await request(app)
                .post('/auth/verify')
                .send({ token: 'invalid.token' });

            expect(response.status).toBe(401);
            expect(response.body.error).toContain('nieprawidłowy');
        });

        it('powinien zwrócić błąd przy braku tokena', async () => {
            AuthService.verifyToken.mockImplementation(() => {
                throw new Error('Token jest wymagany');
            });

            const response = await request(app)
                .post('/auth/verify')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('GET /auth/test', () => {
        it('powinien zwrócić status OK', async () => {
            const response = await request(app)
                .get('/auth/test');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body.message).toBe('Operacja zakończona sukcesem');
        });
    });

    describe('POST /auth/request-password-reset', () => {
        it('powinien wysłać email z linkiem resetującym hasło', async () => {
            AuthService.requestPasswordReset.mockResolvedValue({
                success: true,
                message: 'Email wysłany'
            });

            const response = await request(app)
                .post('/auth/request-password-reset')
                .send({ email: 'test@example.com' });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('powinien zwrócić błąd przy braku emaila', async () => {
            const response = await request(app)
                .post('/auth/request-password-reset')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toContain('Email jest wymagany');
        });

        it('powinien zwrócić błąd przy nieistniejącym użytkowniku', async () => {
            AuthService.requestPasswordReset.mockRejectedValue(
                new Error('Użytkownik nie znaleziony')
            );

            const response = await request(app)
                .post('/auth/request-password-reset')
                .send({ email: 'nonexistent@example.com' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('POST /auth/reset-password', () => {
        it('powinien zresetować hasło z poprawnym tokenem', async () => {
            AuthService.resetPassword.mockResolvedValue({
                success: true,
                message: 'Hasło zresetowane'
            });

            const response = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: 'valid.reset.token',
                    newPassword: 'NewPassword123!'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('powinien zwrócić błąd przy nieprawidłowym tokenie resetującym', async () => {
            AuthService.resetPassword.mockRejectedValue(
                new Error('Token resetujący jest nieprawidłowy lub wygasł')
            );

            const response = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: 'invalid.token',
                    newPassword: 'NewPassword123!'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeTruthy();
        });

        it('powinien zwrócić błąd przy braku nowego hasła', async () => {
            AuthService.resetPassword.mockRejectedValue(
                new Error('Nowe hasło jest wymagane')
            );

            const response = await request(app)
                .post('/auth/reset-password')
                .send({
                    token: 'valid.reset.token'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeTruthy();
        });
    });
});
