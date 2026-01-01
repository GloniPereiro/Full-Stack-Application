const log = require('../../models/log');


const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("Brak pliku w żądaniu");
            error.status = 400;
            return next(error);
        }
        // walidacja żeby nazwa pliku nie była pusta
        if (req.file.originalname.trim() === '') {
            const error = new Error("Nazwa pliku nie może być pusta");
            error.status = 400;
            return next(error);
        }
        //walidacja żeby upload zawierał plik
        if (!req.file) {
            const error = new Error("Brak pliku w żądaniu");
            error.status = 400;
            return next(error)
        }

        // 🔥 Zapis logu
        await log.create({
            userId: req.user.id,
            action: "UPLOAD",
            fileName: req.file.filename
        });

        res.json({
            ok: true,
            message: "Plik zapisany",
            file: req.file
        });
    } catch (err) {
        next(err);
    }
};

module.exports = uploadFile;

