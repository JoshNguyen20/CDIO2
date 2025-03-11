const User = require('../models/User');
const { generateToken } = require('../services/jwtService');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/emailService');
const authEmail = require('../middlewares/auth-email');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Kiểm tra email đã được xác thực chưa
    if (!req.verifiedEmail) {
      return res.status(400).json({ 
        err: 1,
        msg: 'Email chưa được xác thực.' 
      });
    }
    
    // Đảm bảo email đăng ký khớp với email đã xác thực
    if (email !== req.verifiedEmail) {
      return res.status(400).json({ 
        err: 1,
        msg: 'Email đăng ký không khớp với email đã xác thực.' 
      });
    }

    // Kiểm tra email đã tồn tại chưa
    if (await User.findOne({ email })) {
      return res.status(400).json({ 
        err: 1,
        msg: 'Email đã tồn tại.' 
      });
    }

    // Tạo user mới
    const user = new User({ name, email, password });
    await user.save();

    console.log(` Đăng ký thành công cho email: ${email}`);

    res.status(201).json({ 
      err: 0,
      msg: 'Đăng ký thành công!' 
    });
  } catch (error) {
    console.error(' Lỗi đăng ký:', error);
    res.status(500).json({ 
      err: 1,
      msg: error.message || 'Đã xảy ra lỗi khi đăng ký.' 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email.' });
    }

    // Tạo JWT reset token với thời hạn 1 giờ
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '1h' }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Gửi email
    const emailSent = await sendEmail(user.email, 'Password Reset', `Click to reset: ${resetLink}`);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
    }

    res.json({ message: 'Password reset email sent.', resetLink }); // Debug, xóa resetLink khi deploy
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Cập nhật mật khẩu
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const profileUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender ,
      age: user.age ,
      weight: user.weight,
      height: user.height,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { 
  register, 
  login, 
  requestPasswordReset, 
  resetPassword, 
  profileUser
};
