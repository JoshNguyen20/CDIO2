const Meal = require('../models/Meal');
const DailyMealPlan = require('../models/DailyMealPlan');

// Tạo và lưu các Meal
const generateAndSaveMeals = async (meals) => {
  const mealIds = [];
  for (const meal of meals) {
    const newMeal = new Meal(meal); // Tạo Meal mới
    await newMeal.save(); // Lưu vào MongoDB
    mealIds.push(newMeal._id); // Lưu ID của Meal
  }
  return mealIds;
};

// Tạo Daily Meal Plan
const createDailyMealPlan = async (day, meals) => {
  const mealIds = await generateAndSaveMeals(meals); // Lưu các Meal và lấy ID

  // Tính tổng macros
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = meals.reduce(
    (acc, meal) => acc + meal.macros.protein,
    0
  );
  const totalCarbs = meals.reduce((acc, meal) => acc + meal.macros.carbs, 0);
  const totalFat = meals.reduce((acc, meal) => acc + meal.macros.fat, 0);

  const dailyMealPlan = new DailyMealPlan({
    day,
    meals: mealIds,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
  });

  await dailyMealPlan.save(); // Lưu DailyMealPlan
  return dailyMealPlan._id; // Trả về ID của DailyMealPlan
};

module.exports = { createDailyMealPlan };
