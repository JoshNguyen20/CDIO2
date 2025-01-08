const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { generateToken } = require('../services/jwtService');
const resetPasswordTemplate = require('../template/templateMail');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email.');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpiresAt = Date.now() + 3600 * 1000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html: resetPasswordTemplate(user.name, resetLink),
  });

  return resetLink;
};
const resetPassword = async (token, newPassword) => {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token.');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  return user;
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
