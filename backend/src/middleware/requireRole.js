const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            const error = new Error("Brak informacji o roli użytkownika");
            error.status = 403;
            return next(error);
        }

        if (req.user.role !== role) {
            const error = new Error("Brak uprawnień");
            error.status = 403;
            return next(error);
        }

        next();
    };
};

module.exports = requireRole;
