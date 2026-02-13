const downloadService = require('../services/downloadService');

const downloadFile = async (req, res, next) => {
    try {
        const filePath = await downloadService(req.params.filename, req.user);
        res.download(filePath);
    } catch (err) {
        next(err);
    }
};

module.exports = downloadFile;
