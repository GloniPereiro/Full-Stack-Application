const fs = require('fs');
const path = require('path');
const Log = require("../models/log");

const downloadService = async (filename, user) => {
    const filePath = path.join(__dirname, '../../uploads', filename);

    if (!fs.existsSync(filePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        throw error;
    }

    await Log.create({
        userId: user.id,
        action: "DOWNLOAD_FILE",
        fileName: filename,
        date: new Date()
    });

    return filePath; // kontroler pobierze plik
};

module.exports = downloadService;
