const renameService = require("../services/renameService");

const renameFile = async (req, res, next) => {
    try {
        const oldFilename = req.params.filename;
        const newName = req.body.newName;
        const user = req.user;

        const updatedFile = await renameService(oldFilename, newName, user);

        res.json({
            ok: true,
            message: "Plik przemieniony",
            file: updatedFile
        });

    } catch (err) {
        next(err);
    }
};

module.exports = renameFile;
