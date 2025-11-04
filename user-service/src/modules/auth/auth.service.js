const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRepository = require('./auth.repository');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXP = '2h';

class AuthService {
    async register({ imie, nazwisko, email, haslo }) {
        const existing = await AuthRepository.findByEmail(email);
        if (existing) throw new Error('Email zajęty');

        const hashed = await bcrypt.hash(haslo, 10);
        const user = await AuthRepository.createUser({ imie, nazwisko, email, haslo: hashed, rola: 'opiekun' });
        return { id: user.id_uzytkownika, email: user.email };
    }

    async login({ email, haslo }) {
        const user = await AuthRepository.findByEmail(email);
        if (!user) throw new Error('Nieprawidłowe dane');

        const ok = await bcrypt.compare(haslo, user.haslo);
        if (!ok) throw new Error('Nieprawidłowe dane');

        const token = jwt.sign({
            id: user.id_uzytkownika,
            role: user.rola,
            email: user.email
        }, JWT_SECRET, { expiresIn: TOKEN_EXP });

        return {
            token,
            user: {
                id: user.id_uzytkownika,
                email: user.email,
                role: user.rola,
                imie: user.imie,
                nazwisko: user.nazwisko
            }
        };
    }

    verifyToken(token) {
        try { return jwt.verify(token, JWT_SECRET); }
        catch { return null; }
    }
}

module.exports = new AuthService();
