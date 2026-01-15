const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        if (!allowedRoles.includes(req.user.rola)) {
            return res.status(403).json({ error: 'Brak uprawnień do tej operacji' });
        }

        next();
    };
};

const checkOwnershipOrRole = (allowedRoles, idParamName = 'id') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        const resourceId = parseInt(req.params[idParamName]);
        const userId = req.user.userId;

        if (allowedRoles.includes(req.user.rola) || userId === resourceId) {
            return next();
        }

        return res.status(403).json({ error: 'Brak uprawnień do tej operacji' });
    };
};

module.exports = { checkRole, checkOwnershipOrRole };
