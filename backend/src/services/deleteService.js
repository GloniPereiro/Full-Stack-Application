const fs = require('fs');
const path = require('path');
const log = require("../models/log");
const File = require("../models/file");

const deleteService = async (filename, user) => {
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        throw error;
    }

    await fs.promises.unlink(filePath);

    await File.findOneAndDelete({ name: filename });

    await log.create({
        email: user.email,
        action: "DELETE_FILE",
        fileName: filename
    });
};

module.exports = deleteService;
