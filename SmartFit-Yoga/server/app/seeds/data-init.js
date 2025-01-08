const mongoose = require('mongoose');
const DailyMealPlan = require('../models/DailyMealPlan');
const DailyWorkoutPlan = require('../models/DailyWorkoutPlan');
const Meal = require('../models/Meal');
const User = require('../models/User');
const WeeklyMealPlan = require('../models/WeeklyMealPlan');
const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const Workout = require('../models/Workout');
require('dotenv').config();

mongoose
  .connect('mongodb+srv://joshnguyen:QnuH6le0Ao1K7L8r@cluster0.wu0od.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    dbName: "SmartFit-Yoga",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error(err));

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Meal.deleteMany({});
    await DailyMealPlan.deleteMany({});
    await WeeklyMealPlan.deleteMany({});
    await Workout.deleteMany({});
    await DailyWorkoutPlan.deleteMany({});
    await WeeklyWorkoutPlan.deleteMany({});
    // Khởi tạo admin user
    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // Hash mật khẩu nếu cần
        role: 'Admin',
      });
      console.log('Admin user created:', adminUser);
    } else {
      console.log('Admin user already exists:', adminUser);
    }

    // Tạo thêm User thường
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123', // Hash mật khẩu nếu cần
        role: 'User',
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password123', // Hash mật khẩu nếu cần
        role: 'User',
      },
    ]);
    console.log('Regular users created:', users);

    // Tạo Meals
    const meals = await Meal.insertMany([
      {
        type: 'Breakfast',
        title: 'Oatmeal with Banana',
        calories: 300,
        macros: { protein: 10, carbs: 50, fat: 5 },
        ingredients: ['100g oatmeal', '1 banana', '200ml milk'],
        recipe: 'https://example.com/oatmeal-banana',
      },
      {
        type: 'Lunch',
        title: 'Grilled Chicken Salad',
        calories: 450,
        macros: { protein: 30, carbs: 20, fat: 10 },
        ingredients: ['150g chicken', '50g lettuce', '10g olive oil'],
        recipe: 'https://example.com/grilled-chicken-salad',
      },
    ]);
    console.log('Meals created:', meals);

    // Tạo Workouts
    const workouts = await Workout.insertMany([
      {
        type: 'Cardio',
        title: 'Running',
        duration: 30,
        intensity: 'Medium',
        description: 'Run at a steady pace to improve endurance.',
      },
      {
        type: 'Strength',
        title: 'Weight Lifting',
        duration: 45,
        intensity: 'High',
        description: 'Perform compound lifts like squats and deadlifts.',
      },
    ]);
    console.log('Workouts created:', workouts);

    // Tạo Daily và Weekly Plans cho mỗi User
    const allUsers = [adminUser, ...users];
    for (const user of allUsers) {
      // Tạo DailyMealPlan
      const dailyMealPlan = await DailyMealPlan.create({
        day: 'Monday',
        meals: meals.map((meal) => meal._id),
        totalCalories: meals.reduce((acc, meal) => acc + meal.calories, 0),
        totalProtein: meals.reduce((acc, meal) => acc + meal.macros.protein, 0),
        totalCarbs: meals.reduce((acc, meal) => acc + meal.macros.carbs, 0),
        totalFat: meals.reduce((acc, meal) => acc + meal.macros.fat, 0),
      });
      console.log(`DailyMealPlan created for ${user.name}:`, dailyMealPlan);

      // Tạo WeeklyMealPlan
      const weeklyMealPlan = await WeeklyMealPlan.create({
        user: user._id,
        week: [dailyMealPlan._id],
      });
      console.log(`WeeklyMealPlan created for ${user.name}:`, weeklyMealPlan);

      // Tạo DailyWorkoutPlan
      const dailyWorkoutPlan = await DailyWorkoutPlan.create({
        day: 'Monday',
        workouts: workouts.map((workout) => workout._id),
        totalDuration: workouts.reduce(
          (acc, workout) => acc + workout.duration,
          0
        ),
        totalIntensity: 'Medium',
      });
      console.log(
        `DailyWorkoutPlan created for ${user.name}:`,
        dailyWorkoutPlan
      );

      // Tạo WeeklyWorkoutPlan
      const weeklyWorkoutPlan = await WeeklyWorkoutPlan.create({
        user: user._id,
        week: [dailyWorkoutPlan._id],
      });
      console.log(
        `WeeklyWorkoutPlan created for ${user.name}:`,
        weeklyWorkoutPlan
      );
    }

    console.log('All seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy seed script
seedData();
