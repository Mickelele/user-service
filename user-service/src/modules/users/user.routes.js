const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');
const { uploadUserImage } = require('./userImage.controller');
const authMiddleware = require('./middleware/authMiddleware')

const upload = multer({ storage: multer.memoryStorage() });


router.post('/uploadImage', authMiddleware, upload.single('file'), uploadUserImage);
router.get('/me', authMiddleware, UserController.getProfile);
router.put('/updateProfile', authMiddleware, UserController.updateProfile);
router.put('/profile/password', authMiddleware, UserController.changePassword);
router.get('/:id', UserController.getUserById);


router.get('/email/:email', UserController.getUserByEmail);
router.post('/', UserController.createUser);

module.exports = router;
