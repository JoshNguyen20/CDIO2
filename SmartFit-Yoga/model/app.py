from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf
import json

app = Flask(__name__)

# Load pre-trained model and required data
model = tf.keras.models.load_model('meal_model.h5')
meal_data = pd.read_csv("meal_dataset.csv")

# Define normalization parameters
X_min = np.array([10, 30, 100])  # Example minimum values for normalization
X_max = np.array([90, 150, 200])  # Example maximum values for normalization

# Preprocessing function
def preprocess_input(data):
    """Normalize input data."""
    normalized_data = (data - X_min) / (X_max - X_min)
    return normalized_data

# Meal plan generator
def generate_weekly_meal_plan(predicted_calories, meal_data):
    """Generate a weekly meal plan based on predicted calories."""
    weekly_meal_plan = []
    used_meals = set()
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    for day_name in days_of_week:
        daily_meal_plan = []
        for i, meal_type in enumerate(["Breakfast", "Lunch", "Dinner"]):
            # Filter meals based on type and exclude already used meals
            filtered_meals = meal_data[(meal_data["type"] == meal_type) & (~meal_data["title"].isin(used_meals))]
            if filtered_meals.empty:
                # If no unused meals available, consider all meals of the type
                filtered_meals = meal_data[meal_data["type"] == meal_type]

            # Find the best matching meal based on calorie difference
            best_match = filtered_meals.iloc[
                (filtered_meals["calories"] - predicted_calories[0][i]).abs().argsort()[:1]
            ]

            for _, meal in best_match.iterrows():
                used_meals.add(meal["title"])
                daily_meal_plan.append({
                    "type": meal["type"],
                    "title": meal["title"],
                    "calories": int(meal["calories"]),
                    "macros": {
                        "protein": int(meal["protein"]),
                        "carbs": int(meal["carbs"]),
                        "fat": int(meal["fat"])
                    },
                    "ingredients": meal["ingredients"].split(", "),
                    "recipe": meal["recipe"]
                })
        weekly_meal_plan.append({"day": day_name, "meals": daily_meal_plan})

    return weekly_meal_plan

# API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input data
        input_data = request.json
        age = input_data.get('age')
        weight = input_data.get('weight')
        height = input_data.get('height')

        if not all([age, weight, height]):
            return jsonify({"error": "Missing required input fields (age, weight, height)."}), 400

        user_data = np.array([[age, weight, height]])

        # Log input data
        print(f"Input data: Age={age}, Weight={weight}, Height={height}")

        # Preprocess and predict
        normalized_data = preprocess_input(user_data)
        predicted_calories = model.predict(normalized_data)

        # Log predicted calories
        print(f"Predicted calories: {predicted_calories}")

        # Generate meal plan
        weekly_meal_plan = generate_weekly_meal_plan(predicted_calories, meal_data)

        # Log generated meal plan
        print(f"Weekly meal plan: {json.dumps(weekly_meal_plan, indent=2, ensure_ascii=False)}")

        return jsonify({
            "predicted_calories": predicted_calories.tolist(),
            "weekly_meal_plan": weekly_meal_plan
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred during processing.", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)