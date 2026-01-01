const fs = require('fs');
const path = require('path');
const log = require("../../models/log");

const deleteFile = (req, res, next) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        return next(error);
    }

    fs.unlink(filePath, async (err) => {
        if (err) {
            const error = new Error('Błąd podczas usuwania pliku');
            error.status = 500;
            return next(error);
        }
        
        await log.create({
            userId: req.user.id,
            action: "DELETE_FILE",
            fileName: filename
        });

        res.json({ ok: true, message: 'Plik usunięty' });
    });
};
module.exports = deleteFile;