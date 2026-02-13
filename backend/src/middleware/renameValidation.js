const path = require("path");
const File = require("../models/file");

module.exports = async (req, res, next) => {
    try {
        const newName = req.body.newName.trim();
        const oldFilename = req.params.filename;

        if (!newName || newName.trim() === "") {
            return res.status(400).json({ ok: false, message: "Nazwa pliku nie może być pusta" });
        }

        if (/^\.+$/.test(newName)) {
            return res.status(400).json({ ok: false, message: "Nazwa pliku nie może składać się tylko z kropek" });
        }

        const forbidden = /[<>:"/\\|?*\x00-\x1F]/g;
        if (forbidden.test(newName)) {
            return res.status(400).json({ ok: false, message: "Nazwa pliku zawiera niedozwolone znaki" });
        }

        if (newName.startsWith(".")) {
            return res.status(400).json({ ok: false, message: "Nazwa pliku nie może zaczynać się od kropki" });
        }

        const ext = path.extname(oldFilename);
        const finalName = `${newName}${ext}`;

        const exists = await File.findOne({ name: finalName });
        if (exists) {
            return res.status(400).json({ ok: false, message: "Plik o takiej nazwie już istnieje" });
        }

        req.finalName = finalName;
        next();

    } catch (err) {
        next(err);
    }
};
