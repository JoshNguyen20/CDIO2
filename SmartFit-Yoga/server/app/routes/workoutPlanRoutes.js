const express = require('express');
const {
  createWeeklyWorkoutPlan,
  getMyWeeklyWorkoutPlan,
  aIPredict,
  countWorkoutPlans,
} = require('../controllers/workoutPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route để tạo Weekly Workout Plan mới
// POST /api/workout-plan
router.post('/generate', authMiddleware, createWeeklyWorkoutPlan);

// Route để lấy Weekly Workout Plan của người dùng hiện tại
// GET /api/workout-plan/my
router.get('/my', authMiddleware, getMyWeeklyWorkoutPlan);

// Lấy Weekly Meal Plan của cá nhân
router.post('/generate-weekly-workout-plan', authMiddleware, aIPredict);

router.get('/count', authMiddleware, countWorkoutPlans);


module.exports = router;
