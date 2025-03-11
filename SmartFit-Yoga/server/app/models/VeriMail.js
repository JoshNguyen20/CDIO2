// models/VeriMail.js
const mongoose = require('mongoose');

const veriMailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 } // Tự động xóa sau 60 giây
});

module.exports = mongoose.model('VeriMail', veriMailSchema);