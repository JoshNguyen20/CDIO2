const Workout = require('../models/Workout');
const DailyWorkoutPlan = require('../models/DailyWorkoutPlan');

const generateAndSaveWorkouts = async (workouts) => {
  const workoutIds = [];
  for (const workout of workouts) {
    const newWorkout = new Workout(workout);
    await newWorkout.save();
    workoutIds.push(newWorkout._id);
  }
  return workoutIds;
};

const createDailyWorkoutPlan = async (day, workouts) => {
  const workoutIds = await generateAndSaveWorkouts(workouts);

  const totalDuration = workouts.reduce(
    (acc, workout) => acc + workout.duration,
    0
  );
  const totalIntensity = '2';

  const dailyPlan = new DailyWorkoutPlan({
    day,
    workouts: workoutIds,
    totalDuration,
    totalIntensity,
  });

  await dailyPlan.save();
  return dailyPlan._id;
};

module.exports = { createDailyWorkoutPlan };
