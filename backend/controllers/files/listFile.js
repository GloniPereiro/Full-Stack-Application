const File = require('../../models/file');
const listFiles = async (req, res, next) => {
    
    try {
        const files = await File.find();
        res.json({ ok: true, files });
    } catch (err) {
        next(err);
    }
};
module.exports = listFiles;
