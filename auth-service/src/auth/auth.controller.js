const AuthService = require('./auth.service');

const AuthController = {
    async register(req, res) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            
            // Ustawienie tokenu w httpOnly cookie
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 2 * 60 * 60 * 1000 // 2 godziny (zgodnie z TOKEN_EXP)
            });
            
            // Zwracanie tylko danych użytkownika bez tokenu
            res.status(200).json({
                user: result.user,
                success: true
            });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    },

    async verify(req, res) {
        try {
            const { token } = req.body;
            const data = AuthService.verifyToken(token);
            if (!data) return res.status(401).json({ error: 'Token nieprawidłowy' });
            res.json(data);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async test(req, res) {
        try {
            return res.status(200).json({
                message: "Operacja zakończona sukcesem",
                status: "OK"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Wystąpił błąd serwera",
                error: error.message
            });
        }
    },

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ error: 'Email jest wymagany' });
            }
            
            const result = await AuthService.requestPasswordReset(email);
            res.status(200).json(result);
        } catch (err) {
            console.error('Błąd przy żądaniu resetowania hasła:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            const result = await AuthService.resetPassword(token, newPassword);
            res.status(200).json(result);
        } catch (err) {
            console.error('Błąd przy resetowaniu hasła:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });
            res.status(200).json({ 
                success: true,
                message: 'Wylogowano pomyślnie' 
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = AuthController;
