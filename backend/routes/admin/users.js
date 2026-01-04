/*const express = require("express");
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

module.exports = router;*/

const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const requireRole = require("../../middleware/requireRole");
const {
  createUserController,
  getUsersController,
  deleteUserController,
  updateUserRoleController
} = require("../../controllers/userController");

// CREATE USER
router.post(
  "/create",
  authMiddleware,
  requireRole("admin"),
  createUserController
);

// GET ALL USERS
router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  getUsersController
);

// DELETE USER
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  deleteUserController
);

// UPDATE ROLE
router.put(
  "/:id/role",
  authMiddleware,
  requireRole("admin"),
  updateUserRoleController
);

module.exports = router;
