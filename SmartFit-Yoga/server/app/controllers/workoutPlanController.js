const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const { createDailyWorkoutPlan } = require('../repository/workoutPlanRepository');
const { callPredictApi } = require('../services/workoutService');

/**
 * Create a new Weekly Workout Plan
 */
const createWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { age, weight, goal, gender, height } = req.body;

    // Validate required fields
    if (!age || !weight || !goal || !gender || !height) {
      return res.status(400).json({
        message: 'Age, weight, goal, gender, and height are required.',
      });
    }

    // Validate authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Mock or fetch workouts data
    const apiWorkoutData = {}; // Replace this with the actual data fetching logic or mock data.

    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const workouts = apiWorkoutData[day] || [];
      if (!Array.isArray(workouts) || workouts.length === 0) {
        throw new Error(`No workouts provided for day ${day}`);
      }
      const dailyPlanId = await createDailyWorkoutPlan(day, workouts);
      dailyPlans.push(dailyPlanId);
    }

    const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: req.user._id,
      week: dailyPlans,
      goal,
      age,
      weight,
      height,
      gender,
    });

    await weeklyWorkoutPlan.save();

    res.status(201).json({
      message: 'Weekly Workout Plan created successfully.',
      weeklyWorkoutPlan,
    });
  } catch (error) {
    console.error('Error creating weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Save Weekly Workout Plan to Database (Reusable Function)
 */
const saveWeeklyWorkoutPlanToDB = async (data) => {
  try {
    const newWeeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: data.user,
      week: data.week,
      goal: data.goal,
      age: data.age,
      weight: data.weight,
      height: data.height,
      gender: data.gender,
      createdAt: data.createdAt,
    });

    const savedPlan = await newWeeklyWorkoutPlan.save();
    console.log('WeeklyWorkoutPlan saved:', savedPlan);

    return savedPlan;
  } catch (error) {
    console.error('Error saving WeeklyWorkoutPlan:', error);
    throw error;
  }
};

/**
 * Retrieve the current user's Weekly Workout Plan
 */
const getMyWeeklyWorkoutPlan = async (req, res) => {
  try {
    const weeklyWorkoutPlan = await WeeklyWorkoutPlan.findOne({
      user: req.user._id,
    }).populate({
      path: 'week', // Populate DailyWorkoutPlan
      populate: {
        path: 'workouts', // Populate Workout inside DailyWorkoutPlan
        model: 'Workout',
      },
    });

    if (!weeklyWorkoutPlan) {
      return res
        .status(404)
        .json({ message: 'No Weekly Workout Plan found for this user.' });
    }

    res.status(200).json({
      message: 'Weekly Workout Plan retrieved successfully.',
      weeklyWorkoutPlan,
    });
  } catch (error) {
    console.error('Error retrieving weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Generate Weekly Workout Plan using AI Prediction
 */
const aIPredict = async (req, res) => {
  try {
    const { age, weight, goal, height, gender } = req.body;

    // Validate input data
    if (!age || !weight || !goal || !height || !gender) {
      return res.status(400).json({
        message: 'Age, weight, goal, height, and gender are required.',
      });
    }

    console.log('Input data:', { age, weight, goal, height, gender });

    // Call prediction API
    const result = await callPredictApi(age, weight, goal, height, gender);

    console.log('Predict API result:', result);

    if (result && result.weekly_plan) {
      const dailyPlans = [];

      // Process weekly workout plan details
      for (const detail of result.weekly_plan) {
        const { day, workouts } = detail;
        const dailyPlanId = await createDailyWorkoutPlan(day, workouts);
        dailyPlans.push(dailyPlanId);
      }

      // Save the weekly workout plan
      const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
        user: req.user._id,
        week: dailyPlans,
      });

      await weeklyWorkoutPlan.save();

      return res.status(201).json({
        message: 'Weekly Workout Plan created successfully.',
        weeklyWorkoutPlan,
      });
    } else {
      return res.status(400).json({
        message: 'No weekly workout plan data received from prediction.',
      });
    }
  } catch (error) {
    console.error('Error creating weekly workout plan with AI:', error);
    return res.status(500).json({ error: error.message });
  }
};

const countWorkoutPlans = async (req, res) => {
  try {
    const weeklyWorkoutPlanCount = await WeeklyWorkoutPlan.countDocuments();
    //const dailyMealPlanCount = await DailyMealPlan.countDocuments(); // Nếu có schema DailyMealPlan

    res.status(200).json({
      weeklyWorkoutPlanCount,
      //dailyMealPlanCount,
    });
  } catch (error) {
    console.error('Error counting meal plans:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWeeklyWorkoutPlan, getMyWeeklyWorkoutPlan, aIPredict, countWorkoutPlans};
