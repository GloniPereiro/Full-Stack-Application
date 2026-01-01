const fs = require('fs');
const path = require('path');
const log = require("../../models/log");

const renameFile = (req, res, next) => {
    const oldFilename = req.params.filename;
    const newFilename = req.body.newName;
    const oldFilePath = path.join(process.cwd(), 'uploads', oldFilename);
    const newFilePath = path.join(process.cwd(), 'uploads', newFilename);

   // zmiana nazwy pliku
    fs.rename(oldFilePath, newFilePath, async (err) => {
        if (err) {
            const error = new Error('Błąd podczas zmiany nazwy pliku');
            error.status = 500;
            return next(error);
        }
        await log.create({
            userId: req.user.id,
            action: "RENAME_FILE",
            fileName: newFilename
        });

        res.json({ ok: true, message: 'Plik przemieniony' });
    });
};

module.exports = renameFile;