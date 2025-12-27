console.log("ŁADUJĘ PLIK FILES.JS:", __filename);


const express = require("express");
const router = express.Router();
const fileController = require("../controllers/filesController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer');
//trasa do obsługi plików które są chronione przez middleware do autoryzacji użytkownika 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //katalog docelowy do przechowywania plików
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); //nazwa pliku z prefiksem czasowym
    }
});
const upload = multer({ storage }); //konfiguracja multer do obsługi przesyłania plików
//upload pliku
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
    res.json({ ok: true, message: 'Plik zapiany', file: req.file });
});


const fs = require('fs');
const path = require('path');

router.get('/', authMiddleware, (req, res) => {
    const uploadDir = path.join(process.cwd(), 'uploads');

    console.log("UPLOAD DIR:", uploadDir);
    console.log("EXISTS:", fs.existsSync(uploadDir));

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
});

router.delete('/:filename', authMiddleware, (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // sprawdź czy plik istnieje
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ ok: false, message: 'Plik nie istnieje' });
    }

    // usuń plik
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ ok: false, message: 'Błąd podczas usuwania pliku' });
        }

        res.json({ ok: true, message: 'Plik usunięty' });
    });
});


module.exports = router; //eksportowanie routera do użycia w server.js
