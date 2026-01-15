const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');
const { uploadUserImage } = require('./userImage.controller');
const authMiddleware = require('./middleware/authMiddleware');
const { checkRole, checkOwnershipOrRole } = require('../middleware/roleMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/test/test', UserController.test);

router.post('/uploadImage', authMiddleware, upload.single('file'), uploadUserImage);
router.get('/me', authMiddleware, UserController.getProfile);
router.put('/updateProfile', authMiddleware, UserController.updateProfile);
router.put('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), UserController.changeData);
router.put('/profile/password', authMiddleware, UserController.changePassword);
router.get('/reset-token/:token', UserController.getUserByResetToken);
router.get('/:id', authMiddleware, checkOwnershipOrRole(['administrator'], 'id'), UserController.getUserById);

router.get('/email/:email', authMiddleware, checkRole(['administrator']), UserController.getUserByEmail);
router.post('/', authMiddleware, checkRole(['administrator']), UserController.createUser);
router.delete('/:id', authMiddleware, checkRole(['administrator']), UserController.deleteUser);

module.exports = router;