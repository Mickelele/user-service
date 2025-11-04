const express = require('express');
const router = express.Router();
const UserController = require('./uczen.controller');
const authMiddleware = require('../auth/middleware/authMiddleware');

router.get('/me', authMiddleware, UserController.getProfile);
router.put('/updateProfile', authMiddleware, UserController.updateProfile);
router.put('/profile/password', authMiddleware, UserController.changePassword);

module.exports = router;
