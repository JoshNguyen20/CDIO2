const axios = require('axios'); // Thư viện HTTP client cho Node.js

/**
 * Call Flask API to predict calories and generate a meal plan.
 * @param {number} age - The age of the user.
 * @param {number} weight - The weight of the user in kilograms.
 * @param {number} height - The height of the user in centimeters.
 * @returns {Promise<Object>} - The response from the Flask API.
 */
const callPredictApi = async (age, weight, height) => {
  const apiUrl = 'http://localhost:5001/predict'; // URL của Flask API

  try {
    // Gửi yêu cầu POST đến Flask API
    const response = await axios.post(apiUrl, {
      age,
      weight,
      height,
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