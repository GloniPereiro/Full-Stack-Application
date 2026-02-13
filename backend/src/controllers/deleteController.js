const deleteService = require("../services/deleteService");

const deleteFile = async (req, res, next) => {
    try {
        const filename = req.params.filename;
        const user = req.user;
        console.log(filename);
        await deleteService(filename, user);

        res.json({
            ok: true,
            message: "Plik usunięty"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = deleteFile;
