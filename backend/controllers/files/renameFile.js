const fs = require('fs');
const path = require('path');
const log = require("../../models/log");
const File = require("../../models/file");

const renameFile = async (req, res, next) => {


    try {

        const oldFilename = req.params.filename;
        const newFilename = req.finalName; // 🔥 nazwa wyliczona w walidacji
        const oldFilePath = path.join(process.cwd(), 'uploads', oldFilename);
        const newFilePath = path.join(process.cwd(), 'uploads', newFilename);

        // 🔥 1. Zmień nazwę fizycznego pliku
        await fs.promises.rename(oldFilePath, newFilePath);

        // 🔥 2. Zaktualizuj dokument w MongoDB
        const updated = await File.findOneAndUpdate(
            { name: oldFilename },
            { name: newFilename, url: `/uploads/${newFilename}` },
            { new: true }
        );

        if (!updated) {
            const error = new Error("Nie znaleziono pliku w bazie");
            error.status = 404;
            return next(error);
        }

        // 🔥 3. Zapisz log
        await log.create({
            userId: req.user.id,
            action: "RENAME_FILE",
            fileName: newFilename,
            date: new Date()
        });

        // 🔥 4. Zwróć nowy dokument
        res.json({
            ok: true,
            message: "Plik przemieniony",
            file: updated
        });

    } catch (err) {
        next(err);
    }
};

module.exports = renameFile;
