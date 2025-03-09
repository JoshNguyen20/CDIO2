const express = require('express');
const {
  register,
  login,
  profileUser,
  requestPasswordReset,
  resetPassword 
} = require('../controllers/authController');
const { limiter, limiterAuth } = require('../services/rateLimit');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCodeVery, verifiedMail, checkVerifiedEmail } = require('../middlewares/auth-email');
const validate = require('../middlewares/validate');
const User = require('../models/User');

const router = express.Router();

// Kiểm tra email đã tồn tại
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gửi mã xác thực email (bước 1 của đăng ký)
router.post('/send-verification', createCodeVery);

// Đăng ký tài khoản sau khi xác thực email
router.post('/register/:codeMail', verifiedMail, register);

// Đăng nhập với giới hạn request
router.post('/login', limiterAuth, login);

// Lấy thông tin người dùng
router.get('/me', authMiddleware, profileUser);

// Gửi yêu cầu đặt lại mật khẩu
router.post('/request-reset', validate, requestPasswordReset);

// Đặt lại mật khẩu với token
router.post('/reset-password/:token', validate, resetPassword);

// Xác thực email với mã
router.post('/verify-email/:codeMail', verifiedMail, (req, res) => {
  console.log("Mã xác thực nhận được:", req.params.codeMail);
  
  if (!req.params.codeMail) {
    return res.status(400).json({ 
      err: 1,
      msg: "Mã xác thực không hợp lệ!" 
    });
  }
  
  // Nếu đến đây, middleware verifiedMail đã xác thực thành công
  res.status(200).json({ 
    err: 0,
    msg: "Email verified successfully!", 
    success: true,
    verifiedEmail: req.verifiedEmail // Trả về email đã xác thực
  });
});

module.exports = router;
