const mongoose = require('mongoose');
const mealSchema = require('./Meal').schema; // Import schema của Meal

// Schema cho một ngày trong tuần
const dailyMealPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    required: true,
  }, // Ngày trong tuần
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }], // Tham chiếu đến các bữa ăn
  totalCalories: { type: Number, required: true }, // Tổng calo
  totalProtein: { type: Number, required: true }, // Tổng protein (g)
  totalCarbs: { type: Number, required: true }, // Tổng carbs (g)
  totalFat: { type: Number, required: true }, // Tổng fat (g)
});

// Xuất model
module.exports = mongoose.model('DailyMealPlan', dailyMealPlanSchema);
