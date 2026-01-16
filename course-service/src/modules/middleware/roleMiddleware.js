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

        const resourceId = parseInt(req.params[idParamName]);
        const userId = req.user.id;

        if (userId !== resourceId) {
            return res.status(403).json({ error: 'Brak dostępu do tego zasobu' });
        }

        next();
    };
};

module.exports = { checkRole, checkOwnership };
