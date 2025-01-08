const mongoose = require('mongoose');

// Schema cho một bữa ăn
const mealSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true,
  }, // Loại bữa ăn
  title: { type: String, required: true }, // Tên món ăn
  calories: { type: Number, required: true }, // Tổng calo
  macros: {
    protein: { type: Number, required: true }, // Protein (g)
    carbs: { type: Number, required: true }, // Carbs (g)
    fat: { type: Number, required: true }, // Fat (g)
  },
  ingredients: [{ type: String, required: true }], // Danh sách nguyên liệu
  recipe: { type: String }, // Link hoặc mô tả công thức
});

// Xuất model
module.exports = mongoose.model('Meal', mealSchema);
