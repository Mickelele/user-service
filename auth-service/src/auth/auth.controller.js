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
            
           
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,        
                secure: process.env.NODE_ENV === 'production',  
                sameSite: 'strict',   
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/auth/'        
            });

           
            res.status(200).json({
                accessToken: result.accessToken,  
                user: result.user
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

    async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: 'Refresh token nie znaleziony' });
            }

            const result = await AuthService.refreshTokens(refreshToken);
            
         
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/auth/'
            });

            
            res.status(200).json({
                accessToken: result.accessToken,
                user: result.user
            });
        } catch (err) {
            console.error('Błąd przy odświeżaniu tokena:', err);
            res.status(401).json({ error: err.message });
        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('refreshToken', {
                path: '/auth/'
            });
            
            const result = AuthService.logout();
            res.status(200).json(result);
        } catch (err) {
            console.error('Błąd przy wylogowaniu:', err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = AuthController;
