const fs = require('fs');
const path = require('path');

const listFiles = (req, res, next) => {
    const uploadDir = path.join(process.cwd(), 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            const error = new Error('Błąd odczytu folderu');
            error.status = 500;
            return next(error);

        }

        const fileList = files.map(filename => ({
            name: filename,
            url: `/uploads/${filename}`
        }));

        res.json({ ok: true, files: fileList });
    });
};

module.exports = listFiles;