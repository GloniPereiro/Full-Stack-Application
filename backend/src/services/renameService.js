const fs = require("fs");
const path = require("path");
const File = require("../models/file");
const Log = require("../models/log");

const renameService = async (oldFilename, newName, user) => {

    if (!newName || newName.trim() === "") {
        const error = new Error("Nazwa pliku nie może być pusta");
        error.status = 400;
        throw error;
    }

    if (/^\.+$/.test(newName)) {
        const error = new Error("Nazwa pliku nie może składać się tylko z kropek");
        error.status = 400;
        throw error;
    }

    const forbidden = /[<>:"/\\|?*\x00-\x1F]/g;
    if (forbidden.test(newName)) {
        const error = new Error("Nazwa pliku zawiera niedozwolone znaki");
        error.status = 400;
        throw error;
    }

    if (newName.startsWith(".")) {
        const error = new Error("Nazwa pliku nie może zaczynać się od kropki");
        error.status = 400;
        throw error;
    }

    const ext = path.extname(oldFilename);

    const finalName = `${newName}${ext}`;

    const exists = await File.findOne({ name: finalName });
    if (exists) {
        const error = new Error("Plik o takiej nazwie już istnieje");
        error.status = 400;
        throw error;
    }

    const oldPath = path.join(__dirname, "../../uploads", oldFilename);
    const newPath = path.join(__dirname, "../../uploads", finalName);

    if (!fs.existsSync(oldPath)) {
        const error = new Error("Plik fizycznie nie istnieje na dysku");
        error.status = 404;
        throw error;
    }

    await fs.promises.rename(oldPath, newPath);

    const updated = await File.findOneAndUpdate(
        { name: oldFilename },
        { name: finalName, url: `/uploads/${finalName}` },
        { new: true }
    );

    if (!updated) {
        const error = new Error("Nie znaleziono pliku w bazie");
        error.status = 404;
        throw error;
    }

    await Log.create({
        userId: user.id,
        action: "RENAME_FILE",
        fileName: finalName,
        date: new Date()
    });

    return updated;
};

module.exports = renameService;
