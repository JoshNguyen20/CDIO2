const mongoose = require('mongoose');

const dailyWorkoutPlanSchema = new mongoose.Schema({
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
  },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }], // Tham chiếu Workout
  totalDuration: { type: Number, required: true },
  totalIntensity: { type: String },
});

// Xuất thành model riêng
module.exports = mongoose.model('DailyWorkoutPlan', dailyWorkoutPlanSchema);