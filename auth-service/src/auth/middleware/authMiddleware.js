const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    let token = req.cookies?.token;
    
    if (!token) {
        const header = req.headers['authorization'];
        if (header) {
            token = header.split(' ')[1];
        }
    }
    
    if (!token) {
        return res.status(401).json({ error: 'Brak tokena' });
    }
    
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
}

module.exports = authMiddleware;
