from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split

# Initialize Flask app
app = Flask(__name__)

# 1. Load Dataset
daily_workout_dataset_path = "daily_workout_dataset.csv"
workout_dataset_path = "workout_dataset.csv"

daily_workout_data = pd.read_csv(daily_workout_dataset_path)
workout_data = pd.read_csv(workout_dataset_path)

# Preprocessing
daily_workout_data = daily_workout_data.dropna()
daily_workout_data['age'] = pd.to_numeric(daily_workout_data['age'], errors='coerce')
daily_workout_data['weight'] = pd.to_numeric(daily_workout_data['weight'], errors='coerce')
daily_workout_data['height'] = pd.to_numeric(daily_workout_data['height'], errors='coerce')
daily_workout_data['gender'] = pd.to_numeric(daily_workout_data['gender'], errors='coerce')
goal_map = {"Lose Weight": 0, "Build Muscle": 1, "Maintain Weight": 2}
daily_workout_data['goal'] = daily_workout_data['goal'].map(goal_map)
daily_workout_data = daily_workout_data.dropna()

X = daily_workout_data[['age', 'gender', 'weight', 'height', 'goal']].values
y = daily_workout_data[['total_duration', 'total_intensity']].values

X_min, X_max = X.min(axis=0), X.max(axis=0)
X = (X - X_min) / (X_max - X_min)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model definition
model = Sequential([
    Dense(32, input_dim=5, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01)),
    Dropout(0.2),
    Dense(64, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01)),
    Dense(2)
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
model.fit(X_train, y_train, epochs=100, batch_size=16, validation_data=(X_test, y_test), verbose=1)

# Helper function for generating weekly workout plan
def generate_weekly_workout_plan(predicted_duration, predicted_intensity, workout_data):
    weekly_workout_plan = []
    used_workouts = set()
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    def convert_intensity(intensity):
        return ["low", "medium", "high"][intensity - 1] if 1 <= intensity <= 3 else "medium"

    def get_daily_workouts(predicted_duration, predicted_intensity, workout_data):
        daily_workout_plan = []
        total_duration_used = 0
        total_intensity_used = 0
        available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

        while total_duration_used < predicted_duration and total_intensity_used < predicted_intensity and len(available_workouts) > 0:
            best_match = available_workouts.iloc[(
                (available_workouts["duration"] - (predicted_duration - total_duration_used)).abs() +
                (available_workouts["intensity"] - (predicted_intensity - total_intensity_used)).abs()
            ).argsort()[:1]]

            for _, workout in best_match.iterrows():
                used_workouts.add(workout["workout_title"])
                daily_workout_plan.append({
                    "type": workout["type"],
                    "workout_title": workout["workout_title"],
                    "duration": int(workout["duration"]),
                    "intensity": convert_intensity(workout["intensity"]),
                    "description": workout["description"]
                })
                total_duration_used += workout["duration"]
                total_intensity_used += workout["intensity"]

            available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

        return daily_workout_plan

    for day_name in days_of_week:
        daily_workout_plan = get_daily_workouts(predicted_duration, predicted_intensity, workout_data)
        weekly_workout_plan.append({"day": day_name, "workouts": daily_workout_plan})

    return weekly_workout_plan

# Flask endpoint
@app.route("/generate-weekly-workout-plan", methods=["POST"])
def generate_plan():
    data = request.json

    # User info from request
    age = data.get("age")
    gender = data.get("gender")
    weight = data.get("weight")
    height = data.get("height")
    goal = data.get("goal")

    # Validate input
    if not all(isinstance(v, (int, float)) for v in [age, gender, weight, height]) or goal not in goal_map:
        return jsonify({"error": "Invalid input"}), 400

    # Preprocess user input
    goal_encoded = goal_map[goal]
    user_input = np.array([[age, gender, weight, height, goal_encoded]])
    user_input = (user_input - X_min) / (X_max - X_min)

    # Predict duration and intensity
    predicted_duration, predicted_intensity = model.predict(user_input)[0]
    
    # Convert NumPy float32 to Python float
    predicted_duration = float(predicted_duration)
    predicted_intensity = float(predicted_intensity)

    # Generate weekly workout plan
    weekly_plan = generate_weekly_workout_plan(predicted_duration, predicted_intensity, workout_data)
    return jsonify({"predicted_duration": predicted_duration, "predicted_intensity": predicted_intensity, "weekly_plan": weekly_plan})

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000, debug=True)
