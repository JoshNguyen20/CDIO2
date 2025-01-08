const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  weight: { type: Number },
  height: { type: Number },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
}, {
  timestamps: true
});

// Hash password trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hàm so sánh mật khẩu
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
