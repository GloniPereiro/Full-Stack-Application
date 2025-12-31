const Log = require("../models/log");

exports.getLogs = async (req, res, next) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });

        res.json({
            ok: true,
            data: logs
        });
    } catch (err) {
        next(err);
    }
};
