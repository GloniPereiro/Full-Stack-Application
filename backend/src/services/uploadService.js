const Log = require('../models/log');
const File = require('../models/file');
const fs = require('fs/promises');
const path = require('path');

const upload = async (file, user) => {
    
    if (!file) {
        const error = new Error("Brak pliku w żądaniu");
        error.status = 400;
        throw error;
    }

    if (file.originalname.trim() === '') {
        const error = new Error("Nazwa pliku nie może być pusta");
        error.status = 400;
        throw error;
    }
    
    const exists = await File.findOne({ name: file.filename });
    if (exists){
        const error = new Error("Plik o takiej nazwie już istnieje")
        error.status = 400;
        throw error;
    }

    if (file.originalname.startsWith(".")) {
        await fs.unlink(path.join(__dirname, '../../uploads', file.filename));
        const error = new Error("Nazwa nie może zaczynać się od kropki");
        error.status = 400;
        throw error;
    }

    await Log.create({
        action: "UPLOAD",
        fileName: file.filename,
        date: new Date(),
        email: user.email
    });

    const savedFile = await File.create({
        name: file.filename,
        url: `/uploads/${file.filename}`,
        size: file.size,
        uploadedBy: user.email,
        uploadedAt: new Date()
    });

    return savedFile;
};

module.exports = upload;
