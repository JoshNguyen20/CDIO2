const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
