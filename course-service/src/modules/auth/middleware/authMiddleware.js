const authService = require('../auth.service');

function authMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ error: 'Brak tokena' });

    const token = header.split(' ')[1];
    const payload = authService.verifyToken(token);
    if (!payload) return res.status(401).json({ error: 'Nieprawidłowy token' });

    req.user = payload;
    next();
}

module.exports = authMiddleware;
