const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AuthRepository = require('./auth.repository');
const axios = require('axios');
const EmailService = require('../services/email.service');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_different';
const ACCESS_TOKEN_EXP = '15m';  
const REFRESH_TOKEN_EXP = '7d';   
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';


class AuthService {
    async register({ imie, nazwisko, email, haslo, register }) {
        const existing = await AuthRepository.findByEmail(email).catch(() => null);
        if (existing) throw new Error('Email zajęty');

        const user = await AuthRepository.createUser({
            imie,
            nazwisko,
            email,
            haslo: haslo,
            rola: 'opiekun'
        });

        try {
            const statusResponse = await axios.get(`${USER_SERVICE_URL}/status/rola-status`);
            const statusAktywny = statusResponse.data.find(s => s.status === 'aktywny');
            
            if (statusAktywny) {
                await axios.post(`${USER_SERVICE_URL}/status/historia/internal`, {
                    id_uzytkownik: user.id_uzytkownika,
                    id_statusu: statusAktywny.id_statusu
                });
            }
        } catch (err) {
            console.error('Błąd podczas tworzenia statusu dla nowego użytkownika:', err.message);
        }

        return { id: user.id_uzytkownika, email: user.email };
    }

    async login({ email, haslo }) {
        console.log('Próba logowania dla:', email);
        
        const user = await AuthRepository.findByEmail(email);
        if (!user) {
            console.log('Użytkownik nie znaleziony');
            throw new Error('Nieprawidłowe dane email');
        }

        console.log('Znaleziono użytkownika:', user.id_uzytkownika);
        console.log('Czy ma hasło w bazie:', !!user.haslo);

        if (!user.haslo) {
            console.error('BŁĄD: Użytkownik nie ma hasła w bazie!');
            throw new Error('Konto nie ma ustawionego hasła');
        }

        if (!haslo) {
            throw new Error('Hasło jest wymagane');
        }

        const ok = await bcrypt.compare(haslo, user.haslo);
        console.log('Wynik porównania hasła:', ok);
        
        if (!ok) throw new Error('Nieprawidłowe dane');

       
        const accessToken = jwt.sign({
            id: user.id_uzytkownika,
            role: user.rola,
            email: user.email
        }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });

       
        const refreshToken = jwt.sign({
            id: user.id_uzytkownika,
            type: 'refresh'
        }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXP });

        return {
            accessToken,
            refreshToken,
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
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch {
            return null;
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET);
        } catch {
            return null;
        }
    }

    async refreshTokens(refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token jest wymagany');
        }

        const decoded = this.verifyRefreshToken(refreshToken);
        if (!decoded || decoded.type !== 'refresh') {
            throw new Error('Nieprawidłowy refresh token');
        }

        
        const user = await AuthRepository.findById(decoded.id);
        if (!user) {
            throw new Error('Użytkownik nie istnieje');
        }

   
        const newAccessToken = jwt.sign({
            id: user.id_uzytkownika,
            role: user.rola,
            email: user.email
        }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });

        
        const newRefreshToken = jwt.sign({
            id: user.id_uzytkownika,
            type: 'refresh'
        }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXP });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                id: user.id_uzytkownika,
                email: user.email,
                role: user.rola,
                imie: user.imie,
                nazwisko: user.nazwisko
            }
        };
    }

    logout() {
        return { message: 'Wylogowano pomyślnie' };
    }

    async requestPasswordReset(email) {
        const user = await AuthRepository.findByEmail(email);
        if (!user) {
            throw new Error('Nie znaleziono użytkownika z tym adresem email');
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpire = new Date(Date.now() + 3600000);

        await AuthRepository.updateResetToken(user.id_uzytkownika, resetToken, resetTokenExpire);

        try {
            await EmailService.sendPasswordResetEmail(email, resetToken);
            console.log(`TOKEN DO RESETOWANIA: ${resetToken}`); 
            return {
                message: 'Email z linkiem do resetowania hasła został wysłany'
            };
        } catch (emailError) {
            console.error('Błąd wysyłania emaila:', emailError.message);
            console.log('TOKEN DO TESTÓW:', resetToken);
            return {
                message: 'Nie udało się wysłać emaila, ale token został wygenerowany (tryb testowy)',
                token: resetToken
            };
        }
    }

    async resetPassword(token, newPassword) {
        if (!token || !newPassword) {
            throw new Error('Token i nowe hasło są wymagane');
        }

        if (newPassword.length < 6) {
            throw new Error('Hasło musi mieć minimum 6 znaków');
        }

        const user = await AuthRepository.findByResetToken(token);
        if (!user) {
            throw new Error('Nieprawidłowy lub wygasły token resetowania');
        }

        if (new Date() > new Date(user.reset_token_expire_time)) {
            throw new Error('Token resetowania hasła wygasł');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await AuthRepository.updatePassword(user.id_uzytkownika, hashedPassword);

        return { message: 'Hasło zostało zresetowane pomyślnie' };
    }
}

module.exports = new AuthService();
