console.log("ŁADUJĘ PLIK FILES.JS:", __filename);
const express = require("express");
const router = express.Router();
const multer = require('multer');
const authMiddleware = require("../../middleware/authMiddleware");
const requireRole = require("../../middleware/requireRole");
const uploadFile = require("../../controllers/files/uploadFile"); 
const listFile = require("../../controllers/files/listFile"); 
const deleteFile = require("../../controllers/files/deleteFile"); 
const renameFile = require("../../controllers/files/renameFile"); 
const downloadFile = require("../../controllers/files/downloadFile");
const renameValidation = require("../../middleware/renameValidation.js");


// konfiguracja uploadu
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

router.get('/', authMiddleware, listFile);
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.delete('/:filename', authMiddleware, requireRole('admin'), deleteFile);
router.get('/download/:filename', authMiddleware, downloadFile);
router.put('/:filename', authMiddleware, renameValidation, renameFile);


module.exports = router;
