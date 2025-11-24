const jwt = require('jsonwebtoken');

function getTeacherIdFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Brak tokena");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Niepoprawny token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}

module.exports = { getTeacherIdFromToken };
