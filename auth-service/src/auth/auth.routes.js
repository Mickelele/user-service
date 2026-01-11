const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const authMiddleware = require('./middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify', AuthController.verify);
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', authMiddleware, AuthController.changePassword);
router.get('/test', AuthController.test);

module.exports = router;
