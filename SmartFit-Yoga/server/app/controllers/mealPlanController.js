const WeeklyMealPlan = require('../models/WeeklyMealPlan');
const { createDailyMealPlan } = require('../repository/mealPlanRepository');
const { generateMealPlan } = require('../services/aiMealPlanService');
const { callPredictApi } = require('../services/mealService');

const createWeeklyMealPlan = async (req, res) => {
  try {
    const { age, weight, height } = req.body;

    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({ message: 'Age, weight, and height are required.' });
    }

    // Danh sách các ngày trong tuần
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    // Tạo Daily Meal Plans
    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const meals = generateMealPlan(age, weight, height); // Gọi AI để sinh bữa ăn
      const dailyPlanId = await createDailyMealPlan(day, meals); // Tạo Daily Meal Plan
      dailyPlans.push(dailyPlanId); // Lưu ID của mỗi ngày
    }

    // Tạo Weekly Meal Plan
    const weeklyMealPlan = new WeeklyMealPlan({
      user: req.user._id,
      week: dailyPlans, // Tham chiếu tới DailyMealPlans
    });

    await weeklyMealPlan.save();

    res.status(201).json({
      message: 'Weekly Meal Plan created successfully.',
      weeklyMealPlan,
    });
  } catch (error) {
    console.error('Error creating weekly meal plan:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMyWeeklyMealPlan = async (req, res) => {
  try {
    // Tìm Weekly Meal Plan của người dùng
    const weeklyMealPlan = await WeeklyMealPlan.findOne({
      user: req.user._id,
    }).populate({
      path: 'week', // Populate DailyMealPlan
      populate: {
        path: 'meals', // Populate Meals trong DailyMealPlan
        model: 'Meal',
      },
    });

    if (!weeklyMealPlan) {
      return res
        .status(404)
        .json({ message: 'No Weekly Meal Plan found for this user.' });
    }

    res.status(200).json({
      message: 'Weekly Meal Plan retrieved successfully.',
      weeklyMealPlan,
    });
  } catch (error) {
    console.error('Error retrieving weekly meal plan:', error);
    res.status(500).json({ error: error.message });
  }
};

const aIPredict = async (req, res) => {
  try {
    const { age, weight, height } = req.body;

    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({ message: 'Age, weight, and height are required.' });
    }

    // Call the API to predict
    const result = await callPredictApi(age, weight, height);

    if ('weekly_meal_plan' in result) {
      const dailyPlans = [];

      for (const detail of result['weekly_meal_plan']) {
        const day = detail['day'];
        const meals = detail['meals'];

        // Insert daily meal plans into the repository
        const dailyPlanId = await createDailyMealPlan(day, meals);
        dailyPlans.push(dailyPlanId);
      }

      // Save the weekly plan with references to daily plans
      const weeklyMealPlan = new WeeklyMealPlan({
        user: req.user._id,
        week: dailyPlans, // Store references to the created daily plans
      });

      await weeklyMealPlan.save();

      // Respond to the client
      return res.status(201).json({
        message: 'Weekly Meal Plan created successfully.',
        weeklyMealPlan,
      });
    } else {
      return res.status(400).json({ message: 'No weekly meal plan data received.' });
    }
  } catch (error) {
    console.error('Error creating weekly meal plan:', error);
    res.status(500).json({ error: error.message });
  }
};

const countMealPlans = async (req, res) => {
  try {
    const weeklyMealPlanCount = await WeeklyMealPlan.countDocuments();
    //const dailyMealPlanCount = await DailyMealPlan.countDocuments(); // Nếu có schema DailyMealPlan

    res.status(200).json({
      weeklyMealPlanCount,
      //dailyMealPlanCount,
    });
  } catch (error) {
    console.error('Error counting meal plans:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createWeeklyMealPlan, getMyWeeklyMealPlan, aIPredict, countMealPlans };
