const express = require('express');
const {
  createWeeklyMealPlan,
  getMyWeeklyMealPlan,
  aIPredict,
  countMealPlans,
} = require('../controllers/mealPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createWeeklyMealPlan);

router.get('/my', authMiddleware, getMyWeeklyMealPlan);

// Lấy Weekly Meal Plan của cá nhân
router.post('/predict', authMiddleware, aIPredict);

// Đếm số lượng Meal Plans của cá nhân

router.get('/count', authMiddleware, countMealPlans);


module.exports = router;
