const uploadService = require('../services/uploadService');

const upload = async (req, res, next) => {
    try {
        const savedFile = await uploadService(req.file, req.user);

        res.json({
            ok: true,
            message: "Plik zapisany",
            file: savedFile
        });

    } catch (err) {
        next(err);
    }
};

module.exports = upload;
