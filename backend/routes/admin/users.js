const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const requireRole = require("../../middleware/requireRole");
const { createUserController } = require("../../controllers/userController");

router.post(
    "/create",
    authMiddleware,
    requireRole("admin"),
    createUserController
);

module.exports = router;
