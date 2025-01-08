const axios = require('axios'); // Thư viện HTTP client cho Node.js

/**
 * Call Flask API to predict calories and generate a meal plan
 * @param {number} age - The age of the user.
 * @param {number} gender
 * @param {number} weight - The weight of the user in kilograms.
 * @param {number} height 
 * @param {string} goal - The fitness goal of the user (e.g., "Weight Loss", "Muscle Gain").
 * @param {number} gender 
 * @returns {Promise<Object>} - The response from the Flask API.
 */
const callPredictApi = async (age, weight, goal, height, gender) => {
  const apiUrl = 'http://localhost:6000/generate-weekly-workout-plan'; // URL của Flask API

  try {
    // Gửi yêu cầu POST đến Flask API
    const response = await axios.post(apiUrl, {
      age,
      gender,
      weight,
      goal,
      gender,
      height
    });

    // Trả về dữ liệu phản hồi từ API
    return response.data;
  } catch (error) {
    console.error('Error calling predict API:', error.message);

    // Trả về lỗi trong trường hợp có lỗi
    throw new Error(
      error.response
        ? error.response.data
        : 'An error occurred while calling the API.'
    );
  }
};
module.exports = { callPredictApi };