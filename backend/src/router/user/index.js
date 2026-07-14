const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const avatarController = require('../../controllers/user/avatar');
router.use('/auth', authRouter);
router.get('/avatar/:id', avatarController.getAvatar);
module.exports = router;