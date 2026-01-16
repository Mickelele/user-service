const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Brak uprawnień do tej operacji' });
        }

        next();
    };
};

const checkOwnership = (idParamName = 'id') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        const userRole = req.user.role;
        
        if (userRole === 'opiekun' || userRole === 'nauczyciel' || userRole === 'administrator') {
            return next();
        }

        const resourceId = parseInt(req.params[idParamName]);
        const userId = req.user.id;

        if (userId !== resourceId) {
            return res.status(403).json({ error: 'Brak dostępu do tego zasobu' });
        }

        next();
    };
};

const checkGuardianStudent = (studentIdParamName = 'userId') => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        
        if (req.user.role !== 'opiekun') {
            return next();
        }

        try {
            const studentId = parseInt(req.params[studentIdParamName]);
            const guardianId = req.user.id;

           
            const axios = require('axios');
            const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4000';
            const response = await axios.get(`${USER_SERVICE_URL}/opiekunowie/${guardianId}/uczniowie`, {
                headers: { Authorization: req.headers.authorization }
            });

            const students = response.data;
            const hasAccess = students.some(student => student.id_ucznia === studentId);

            if (!hasAccess) {
                return res.status(403).json({ error: 'Brak dostępu do danych tego ucznia' });
            }

            next();
        } catch (error) {
            console.error('Błąd weryfikacji dostępu opiekuna:', error.message);
            return res.status(500).json({ error: 'Błąd weryfikacji dostępu' });
        }
    };
};

module.exports = { checkRole, checkOwnership, checkGuardianStudent };
