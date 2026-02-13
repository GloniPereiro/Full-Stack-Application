const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middleware/authMiddleware');
const requireRole = require('../../middleware/requireRole');

// Wszystkie endpointy tutaj są chronione: muszą być zalogowani (authMiddleware) i być adminem (requireRole('admin'))

router.get(
    '/',
    authMiddleware,
    requireRole('admin'),
    userController.getUsers
);

router.post(
    '/create',
    authMiddleware,
    requireRole('admin'),
    userController.createUser
);

router.delete(
    '/:id',
    authMiddleware,
    requireRole('admin'),
    userController.deleteUser
);

router.put(
    '/:id/role',
    authMiddleware,
    requireRole('admin'),
    userController.updateRole
);

module.exports = router;
