const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");
const { getLogs } = require("../controllers/logController");

router.get(
    "/",
    authMiddleware,
    requireRole("admin"),
    getLogs
);

module.exports = router;
