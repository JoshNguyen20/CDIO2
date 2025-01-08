const axios = require("axios");

// const generateWorkoutPlan = (age, weight, goal) => {
//   // Logic cơ bản để gợi ý kế hoạch tập luyện
//   const workouts = [
//     {
//       type: 'Cardio',
//       title: 'Treadmill Running',
//       duration: 30, // 30 phút
//       intensity: 'Medium',
//       description:
//         'Run on the treadmill at a steady pace to improve endurance.',
//     },
//     {
//       type: 'Strength',
//       title: 'Weight Lifting',
//       duration: 45, // 45 phút
//       intensity: 'High',
//       description:
//         'Perform compound lifts like squats and deadlifts for strength.',
//     },
//     {
//       type: 'Flexibility',
//       title: 'Yoga Session',
//       duration: 20, // 20 phút
//       intensity: 'Low',
//       description: 'Stretch and relax with a guided yoga session.',
//     },
//   ];

//   // Có thể tùy chỉnh logic dựa trên tuổi, cân nặng và mục tiêu
//   if (goal === 'Weight Loss') {
//     return workouts.filter((w) => w.type !== 'Strength'); // Tập trung vào Cardio và Flexibility
//   }

//   return workouts;
// };

const WorkoutPlan = require("../models/WeeklyWorkoutPlan");

const generateWorkoutPlan = async (req, res) => {
    try {
        // Lấy dữ liệu từ frontend
        const { age, gender, weight, height, goal } = req.body;

        // Gửi dữ liệu tới API
        const response = await axios.post("http://127.0.0.1:6000/generate-weekly-workout-plan", {
            age,
            gender,
            weight,
            height,
            goal
        });

        // Kiểm tra dữ liệu trả về từ API
        if (response.status === 200 && response.data) {
            const workoutPlanData = response.data;

            // Lưu dữ liệu vào cơ sở dữ liệu
            const workoutPlan = new WorkoutPlan(workoutPlanData);
            await workoutPlan.save();

            // Trả kết quả về cho frontend
            return res.status(201).json({ success: true, data: workoutPlan });
        } else {
            return res.status(500).json({ success: false, message: "Failed to generate workout plan." });
        }
    } catch (error) {
        console.error("Error generating workout plan:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { generateWorkoutPlan };
