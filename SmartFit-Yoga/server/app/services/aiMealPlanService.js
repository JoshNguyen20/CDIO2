// const generateMealPlan = (age, weight, height) => {
//   const calories = Math.round(10 * weight + 6.25 * height - 5 * age + 5);

//   return [
//     {
//       type: 'Breakfast',
//       title: 'Protein Pancakes',
//       calories: Math.round(calories * 0.3),
//       macros: {
//         protein: 50,
//         carbs: 60,
//         fat: 20,
//       },
//       ingredients: [
//         '100g oat flour',
//         '200g bananas',
//         '150g egg whites',
//         '20g honey',
//         '30g protein powder',
//       ],
//       recipe: 'https://example.com/protein-pancakes-recipe',
//     },
//     {
//       type: 'Lunch',
//       title: 'Chicken And Quinoa Salad',
//       calories: Math.round(calories * 0.4),
//       macros: {
//         protein: 50,
//         carbs: 60,
//         fat: 20,
//       },
//       ingredients: [
//         '200g chicken breast',
//         '150g quinoa',
//         '100g mixed vegetables',
//         '20g olive oil',
//         '30g feta cheese',
//       ],
//       recipe: 'https://example.com/chicken-quinoa-salad-recipe',
//     },
//     {
//       type: 'Dinner',
//       title: 'Salmon With Brown Rice And Vegetables',
//       calories: Math.round(calories * 0.3),
//       macros: {
//         protein: 50,
//         carbs: 60,
//         fat: 30,
//       },
//       ingredients: [
//         '200g salmon',
//         '150g brown rice',
//         '100g mixed vegetables',
//         '20g olive oil',
//         '30g soy sauce',
//       ],
//       recipe: 'https://example.com/salmon-brown-rice-recipe',
//     },
//   ];
// };

// module.exports = { generateMealPlan };


const axios = require('axios'); // Thư viện HTTP client cho Node.js

/**
 * Call Flask API to predict calories and generate a meal plan.
 * @param {number} age - The age of the user.
 * @param {number} weight - The weight of the user in kilograms.
 * @param {number} height - The height of the user in centimeters.
 * @returns {Promise<Object>} - The response from the Flask API.
 */
const generateMealPlan = async (age, weight, height) => {
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
module.exports = { generateMealPlan };
