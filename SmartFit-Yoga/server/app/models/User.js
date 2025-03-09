const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ!'] 
  },
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
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err); // Báo lỗi về middleware của Mongoose
  }
});

// Hàm so sánh mật khẩu
userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false; // Tránh lỗi khi mật khẩu không tồn tại
  return await bcrypt.compare(password, this.password);
};

// Ẩn mật khẩu khi trả về JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; 
  return user;
};

module.exports = mongoose.model('User', userSchema);
