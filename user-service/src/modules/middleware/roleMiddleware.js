const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        const userRole = req.user.rola;
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Brak uprawnień do wykonania tej operacji' });
        }

        next();
    };
};

const checkOwnershipOrRole = (allowedRoles, idParamName = 'id') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Brak autoryzacji' });
        }

        const userRole = req.user.rola;
        const userId = req.user.id;
        const resourceId = parseInt(req.params[idParamName]);

       
        if (allowedRoles.includes(userRole)) {
            return next();
        }

        
        if (userId === resourceId) {
            return next();
        }

        return res.status(403).json({ error: 'Możesz dostać tylko własne dane' });
    };
};

module.exports = {
    checkRole,
    checkOwnershipOrRole
};
