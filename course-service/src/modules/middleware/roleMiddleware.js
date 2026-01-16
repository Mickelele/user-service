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

        if (req.user.role === 'administrator') {
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
            const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'https://user-service-hg4z.onrender.com';
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
            console.error('Błąd weryfikacji dostępu opiekuna:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Błąd weryfikacji dostępu', details: error.response?.data || error.message });
        }
    };
};

const checkTeacherGroup = (groupIdParamName = 'id') => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        // Skip check for non-teacher roles and administrators
        if (req.user.role !== 'nauczyciel') {
            return next();
        }

        try {
            const groupId = parseInt(req.params[groupIdParamName]);
            const teacherId = req.user.id;

            const Grupa = require('../group/group.model');
            const grupa = await Grupa.findByPk(groupId);

            if (!grupa) {
                return res.status(404).json({ error: 'Grupa nie istnieje' });
            }

            if (grupa.id_nauczyciela !== teacherId) {
                return res.status(403).json({ error: 'Brak dostępu do tej grupy' });
            }

            next();
        } catch (error) {
            console.error('Błąd weryfikacji dostępu nauczyciela do grupy:', error.message);
            return res.status(500).json({ error: 'Błąd weryfikacji dostępu', details: error.message });
        }
    };
};

const checkTeacherStudent = (studentIdParamName = 'userId') => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        if (req.user.role !== 'nauczyciel') {
            return next();
        }

        try {
            const studentId = parseInt(req.params[studentIdParamName]);
            const teacherId = req.user.id;

            // Get student's group ID via API call to user-service
            const axios = require('axios');
            const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'https://user-service-hg4z.onrender.com';
            
            const studentResponse = await axios.get(`${USER_SERVICE_URL}/uczniowie/${studentId}`, {
                headers: { Authorization: req.headers.authorization }
            });
            
            const student = studentResponse.data;
            if (!student || !student.id_grupa) {
                return res.status(403).json({ error: 'Brak dostępu do danych tego ucznia' });
            }

            // Check if teacher teaches this group
            const Grupa = require('../group/group.model');
            const grupa = await Grupa.findByPk(student.id_grupa);
            
            if (!grupa || grupa.id_nauczyciela !== teacherId) {
                return res.status(403).json({ error: 'Brak dostępu do danych tego ucznia' });
            }

            next();
        } catch (error) {
            console.error('Błąd weryfikacji dostępu nauczyciela do ucznia:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Błąd weryfikacji dostępu', details: error.response?.data || error.message });
        }
    };
};

module.exports = { checkRole, checkOwnership, checkGuardianStudent, checkTeacherGroup, checkTeacherStudent };
