const mongoose = require('mongoose');

// Schema chính cho Weekly Meal Plan
const weeklyMealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người dùng liên kết
  week: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyMealPlan' }], // Tham chiếu tới DailyMealPlans
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

// Xuất model
module.exports = mongoose.model('WeeklyMealPlan', weeklyMealPlanSchema);
