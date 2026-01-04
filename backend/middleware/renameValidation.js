const path = require("path");
const File = require("../models/file");

module.exports = async (req, res, next) => {
        console.log("VALIDATION PARAMS:", req.params);

    try {
        const newName = req.body.newName.trim();
        const oldFilename = req.params.filename;

        // 1. Pusta nazwa
        if (!newName || newName.trim() === "") {
            return res.status(400).json({
                ok: false,
                message: "Nazwa pliku nie może być pusta"
            });
        }

        // 2. Nazwa składająca się tylko z kropek
        if (/^\.+$/.test(newName)) {
            return res.status(400).json({
                ok: false,
                message: "Nazwa pliku nie może składać się tylko z kropek"
            });
        }

        // 3. Niedozwolone znaki
        // eslint-disable-next-line
        const forbidden = /[<>:"/\\|?*\x00-\x1F]/g;
        if (forbidden.test(newName)) {
            return res.status(400).json({
                ok: false,
                message: "Nazwa pliku zawiera niedozwolone znaki"
            });
        }

        // 4. Nazwa nie może zaczynać się od kropki
        if (newName.startsWith(".")) {
            return res.status(400).json({
                ok: false,
                message: "Nazwa pliku nie może zaczynać się od kropki"
            });
        }

        // 5. Pobieramy rozszerzenie starego pliku
        const ext = path.extname(oldFilename); // np. ".pdf"

        // 6. Składamy nową nazwę z rozszerzeniem
        const finalName = `${newName}${ext}`;

        // 7. Sprawdzamy, czy plik o tej nazwie już istnieje
        const exists = await File.findOne({ name: finalName });
        if (exists) {
            return res.status(400).json({
                ok: false,
                message: "Plik o takiej nazwie już istnieje"
            });
        }

        // 8. Przekazujemy finalną nazwę do kontrolera
        req.finalName = finalName;
        next();

    } catch (err) {
        next(err);
    }
};
