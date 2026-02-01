const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
console.log('USER SECRET:', `"${JWT_SECRET}"`, JWT_SECRET.length);

function authMiddleware(req, res, next) {
    let token = req.cookies?.token;
    
    if (!token) {
        const header = req.headers['authorization'];
        if (header) {
            token = header.split(' ')[1];
        }
    }
    
    console.log('TOKEN SOURCE:', req.cookies?.token ? 'cookie' : 'header');
    console.log('TOKEN:', token);
    
    if (!token) {
        return res.status(401).json({ error: 'Brak tokena' });
    }
    
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
