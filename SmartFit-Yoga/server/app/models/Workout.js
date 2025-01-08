const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Core', 'HIIT'],
    required: true, // Bắt buộc phải có loại bài tập
  }, // Loại bài tập
  workout_title: { type: String }, // Tên bài tập
  duration: { type: Number }, // Thời gian tập luyện (phút)
  intensity: { type: String, enum: ['low', 'medium', 'high'] }, // Độ khó
  description: { type: String }, // Mô tả bài tập
});

module.exports = mongoose.model('Workout', workoutSchema);
