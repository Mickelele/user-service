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
            res.status(200).json(result);
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
    }


};

module.exports = AuthController;
