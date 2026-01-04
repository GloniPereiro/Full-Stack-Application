const log = require('../../models/log');
const File = require('../../models/file');

const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("Brak pliku w żądaniu");
            error.status = 400;
            return next(error);
        }

        if (req.file.originalname.trim() === '') {
            const error = new Error("Nazwa pliku nie może być pusta");
            error.status = 400;
            return next(error);
        }

        // 🔥 Zapis logu
        await log.create({
            action: "UPLOAD",
            fileName: req.file.filename,
            date: new Date(),
            email: req.user.email
        });

        // 🔥 Zapis metadanych do MongoDB
        const savedFile = await File.create({
            name: req.file.filename,
            url: `/uploads/${req.file.filename}`,
            size: req.file.size,
            uploadedBy: req.user.email,
            uploadedAt: new Date()
        });

        // 🔥 Zwracamy dokument z bazy (z _id)
        res.json({
            ok: true,
            message: "Plik zapisany",
            file: savedFile
        });

    } catch (err) {
        next(err);
    }
};

module.exports = uploadFile;
