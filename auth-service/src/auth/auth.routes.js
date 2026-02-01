const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const authMiddleware = require('./middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/verify', AuthController.verify);
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);
router.get('/test', AuthController.test);
router.get('/me', authMiddleware, AuthController.getMe);

module.exports = router;
