const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
console.log('USER SECRET:', `"${JWT_SECRET}"`, JWT_SECRET.length);

function authMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    console.log('HEADER:', header);
    if (!header) return res.status(401).json({ error: 'Brak tokena' });

    const token = header.split(' ')[1];
    console.log('TOKEN:', token);
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        console.log('DECODED:', req.user);
        next();
    } catch (err) {
        console.error('JWT error:', err.message);
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
}


module.exports = authMiddleware;
