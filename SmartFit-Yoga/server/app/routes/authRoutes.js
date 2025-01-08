const express = require('express');
const {
  register,
  login,
  profileUser,
  requestPasswordReset,
} = require('../controllers/authController');
const { reset } = require('nodemon');
const { limiter, limiterAuth } = require('../services/rateLimit');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/register',limiterAuth , register);

router.post('/login',limiterAuth , login);

router.get('/me',authMiddleware, profileUser);

router.post('/request-reset', requestPasswordReset);

router.post('/reset-password/:token', reset);
module.exports = router;
