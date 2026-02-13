const os = require("os");

function getCpuUsage() {
    const cpus = os.cpus();

    let idle = 0;
    let total = 0;

    cpus.forEach(core => {
        idle += core.times.idle;
        total += core.times.user + core.times.nice + core.times.sys + core.times.idle + core.times.irq;
    });

    const usage = 1 - idle / total;
    return Math.round(usage * 100); // procent
}

exports.getSystemStats = (req, res) => {
    res.json({
        ok: true,
        uptime: process.uptime(),
        node: process.version,
        platform: process.platform,
        cpuUsage: getCpuUsage(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
    });
};
