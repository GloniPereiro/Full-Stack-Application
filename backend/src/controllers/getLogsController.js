const getLogsService = require("../services/getLogsService");

const getLogsController = async (req, res, next) => {
    try {
        const logs = await getLogsService();

        res.json({
            ok: true,
            logs
        });

    } catch (error) {
        next(error);
    }
};

module.exports = getLogsController;
