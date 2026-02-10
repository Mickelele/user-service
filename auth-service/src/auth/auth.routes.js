const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify', AuthController.verify);
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);
router.get('/test', AuthController.test);

router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

module.exports = router;
