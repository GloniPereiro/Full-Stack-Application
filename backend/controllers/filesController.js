const fs = require('fs');
const path = require('path');
// LISTA PLIKÓW i upload
exports.listFiles = (req, res) => {
    const uploadDir = path.join(process.cwd(), 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ ok: false, message: 'Błąd odczytu folderu' });
        }

        const fileList = files.map(filename => ({
            name: filename,
            url: `/uploads/${filename}`
        }));

        res.json({ ok: true, files: fileList });
    });
};
// USUWANIE
exports.deleteFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ ok: false, message: 'Plik nie istnieje' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ ok: false, message: 'Błąd podczas usuwania pliku' });
        }

        res.json({ ok: true, message: 'Plik usunięty' });
    });
};
// POBIERANIE
exports.downloadFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ ok: false, message: 'Plik nie istnieje' });
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            return res.status(500).json({ ok: false, message: 'Błąd pobierania pliku' });
        }
    });
};
// ZMIANA NAZWY
exports.renameFile = (req, res) => {
    const oldFilename = req.params.filename;
    const newFilename = req.body.newName;
    const oldFilePath = path.join(process.cwd(), 'uploads', oldFilename);
    const newFilePath = path.join(process.cwd(), 'uploads', newFilename);
    //walidacja żeby nazwa była podana
    if (!newFilename) {
        return res.status(400).json({ ok: false, message: 'Nowa nazwa pliku jest wymagana' });
    }
    //walidacja żeby plik istniał
    if (!fs.existsSync(oldFilePath)) {
        return res.status(404).json({ ok: false, message: 'Plik nie istnieje' });
    }
    //walidacja żeby nazwa nie zawierała niedozwolonych znaków
    const invalidChars = /[<>:"\/\\|?*\x00-\x1F]/g;
    if (invalidChars.test(newFilename)) {
        return res.status(400).json({ ok: false, message: 'Nazwa pliku zawiera niedozwolone znaki' });
    }   

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            return res.status(500).json({ ok: false, message: 'Błąd podczas zmiany nazwy pliku' });
        }

        res.json({ ok: true, message: 'Plik przemieniony' });
    });
};