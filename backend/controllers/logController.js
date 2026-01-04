const Log = require("../models/log");

exports.getLogs = async (req, res, next) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        console.log(logs);
        res.json({
            ok: true,
            logs
        });
    } catch (err) {
        next(err);
    }
};
