const express = require("express");
const router = express.Router();
const multer = require('multer');
const authMiddleware = require("../../middleware/authMiddleware");
const uploadFile = require("../../controllers/uploadController"); 
const listFile = require("../../controllers/listController"); 
const deleteFile = require("../../controllers/deleteController");
const downloadFile = require("../../controllers/downloadController");
const renameFile = require("../../controllers/renameController");
const renameValidation = require("../../middleware/renameValidation");
const requireRole = require("../../middleware/requireRole");

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Fix for UTF-8 characters if needed, currently just using originalname
        // Ensuring unique filenames or handling collisions is handled by service but multer overwrites by default
        cb(null, file.originalname); 
    }
});
const upload = multer({ storage });

router.get('/', authMiddleware, listFile);
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.delete('/:filename', authMiddleware, requireRole('admin'), deleteFile);
router.get('/download/:filename', authMiddleware, downloadFile);
router.put('/:filename', authMiddleware, renameValidation, renameFile);


module.exports = router;

//napisz mi teraz o rename file. Ma być napisane bez powtórzen tego co napisales w poprzednim controlerze. Napisz dlaczego jest plik rename walidation i napisz dwa zadania o metodzie put. Oczywiscie napisz to w moim stylu. tu jest kod 