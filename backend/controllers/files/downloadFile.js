const fs = require('fs');
const path = require('path');
const log = require("../../models/log");

const downloadFile = (req, res, next) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        return next(error);
    }

    res.download(filePath, filename, async (err) => {
        if (err) {
            const error = new Error('Błąd pobierania pliku');
            error.status = 500;
            return next(error);
        }
        await log.create({
            userId: req.user.id,
            action: "DOWNLOAD_FILE",
            fileName: filename
        });
    });
};

module.exports = downloadFile;