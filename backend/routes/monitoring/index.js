const express = require("express");
const router = express.Router();
const os = require("os");
const getCpuUsage = require("../../controllers/monitoringController")


router.get('/', (req, res) => {
    res.json({
        ok: true, 
        uptime: process.uptime(), 
        node: process.version, 
        platform: process.platform,
        cpuUsage: getCpuUsage(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),

    })
}

)

module.exports = router;