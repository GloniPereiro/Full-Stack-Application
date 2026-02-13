const express = require("express");
const router = express.Router();
const monitoringController = require("../../controllers/monitoringController");

router.get('/', monitoringController.getSystemStats);

module.exports = router;
