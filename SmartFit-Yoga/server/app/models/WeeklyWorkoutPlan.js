const mongoose = require('mongoose');

const weeklyWorkoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người dùng liên kết
  week: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyWorkoutPlan' }], // Tham chiếu tới DailyWorkoutPlan
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

module.exports = mongoose.model('WeeklyWorkoutPlan', weeklyWorkoutPlanSchema);