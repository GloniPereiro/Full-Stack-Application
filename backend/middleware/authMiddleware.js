const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const error = new Error("Brak nagłówka Authorization");
        error.status = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        const error = new Error("Brak tokena");
        error.status = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(err);
    }
};



