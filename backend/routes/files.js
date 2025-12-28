console.log("ŁADUJĘ PLIK FILES.JS:", __filename);

const express = require("express");
const router = express.Router();
const multer = require('multer');
const authMiddleware = require("../middleware/authMiddleware");
const fileController = require("../controllers/filesController");

// konfiguracja uploadu
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// LISTA PLIKÓW
router.get('/', authMiddleware, fileController.listFiles);

// UPLOAD
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
    res.json({ ok: true, message: 'Plik zapisany', file: req.file });
});

// USUWANIE
router.delete('/:filename', authMiddleware, fileController.deleteFile);

// POBIERANIE
router.get('/download/:filename', authMiddleware, fileController.downloadFile);

// ZMIANA NAZWY
router.put('/:filename', authMiddleware, fileController.renameFile);

// TEST
router.get('/test', (req, res) => {
    console.log("TEST ENDPOINT DZIAŁA");
    res.json({ ok: true });
});

module.exports = router;
