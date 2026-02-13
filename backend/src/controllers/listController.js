const listService = require('../services/listService')

const listFiles = async (req, res, next) => { 
    try {
        const files = await listService();
        res.json({ ok: true, files });
    } catch (err) {
        next(err);
    }
};
module.exports = listFiles;
