// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) { 
    console.error("🔥 ERROR:", err.message);

    const status = err.status || 500;

    res.status(status).json({
        ok: false,
        message: err.message || "Wewnętrzny błąd serwera"
    });
}

module.exports = errorHandler;
