const fs = require('fs');
const path = require('path');
const log = require("../models/log");

// LISTA PLIKÓW
exports.listFiles = (req, res, next) => {
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
// UPLOAD
exports.uploadFile = async (req, res, next) => {
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

// USUWANIE
exports.deleteFile = (req, res, next) => {
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
// POBIERANIE
exports.downloadFile = (req, res, next) => {
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
// ZMIANA NAZWY
exports.renameFile = (req, res, next) => {
    const oldFilename = req.params.filename;
    const newFilename = req.body.newName;
    const oldFilePath = path.join(process.cwd(), 'uploads', oldFilename);
    const newFilePath = path.join(process.cwd(), 'uploads', newFilename);
    //walidacja żeby nazwa była podana
    if (!newFilename) {
        const error = new Error('Nowa nazwa pliku jest wymagana');
        error.status = 400;
        return next(error);
    }
    //walidacja żeby nazwa nie była pusta
    if (newFilename.trim() === '') {
        const error = new Error('Nazwa pliku nie może być pusta');
        error.status = 400;
        return next(error);
    }
    //walidacja żeby plik istniał
    if (!fs.existsSync(oldFilePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        return next(error);
    }
    //walidacja żeby nazwa nie zawierała niedozwolonych znaków,
    // eslint-disable-next-line no-control-regex
    const invalidChars = /[<>:"'/\\=;|?*\x00-\x1F]/;
    if (invalidChars.test(newFilename)) {
        const error = new Error('Nazwa pliku zawiera niedozwolone znaki');
        error.status = 400;
        return next(error);
    }   

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