const Log = require("../models/log");

const getLogsService = async () => {
    const logs = await Log.find().sort({ timestamp: -1 });
    return logs;
};

module.exports = getLogsService;
