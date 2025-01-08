import React, { useState } from "react";
import "./ToolForUser.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const ToolForUser = () => {
  // State cho các công cụ
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [calorieNeeds, setCalorieNeeds] = useState(null);
  const [distance, setDistance] = useState(null);
  const [maxHeartRate, setMaxHeartRate] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);
  const [macroSplit, setMacroSplit] = useState(null);

  // BMI Calculator
  const calculateBMI = () => {
    if (weight && height) {
      const result = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(result);
    }
  };

  // Body Fat Percentage Calculator
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const calculateBodyFat = () => {
    if (gender === "male" && neck && waist && height) {
      const result =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
      setBodyFat(result.toFixed(2));
    } else if (gender === "female" && neck && waist && hip && height) {
      const result =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
      setBodyFat(result.toFixed(2));
    }
  };

  // Daily Calorie Needs Calculator
  const [activityLevel, setActivityLevel] = useState("1.2");

  const calculateCalorieNeeds = () => {
    if (weight && height && age && gender) {
      let bmr;
      if (gender === "male") {
        bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
      } else {
        bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
      }
      const result = (bmr * parseFloat(activityLevel)).toFixed(2);
      setCalorieNeeds(result);
    }
  };

  // Step to Distance Converter
  const [steps, setSteps] = useState("");
  const [strideLength, setStrideLength] = useState("");

  const calculateDistance = () => {
    if (steps && strideLength) {
      const result = (steps * strideLength / 1000).toFixed(2);
      setDistance(result);
    }
  };

  // Heart Rate Zones Calculator
  const calculateHeartRateZones = () => {
    if (age) {
      const maxHR = 220 - age;
      setMaxHeartRate({
        zone1: `${Math.round(maxHR * 0.5)} - ${Math.round(maxHR * 0.6)} bpm`,
        zone2: `${Math.round(maxHR * 0.6)} - ${Math.round(maxHR * 0.7)} bpm`,
        zone3: `${Math.round(maxHR * 0.7)} - ${Math.round(maxHR * 0.8)} bpm`,
        zone4: `${Math.round(maxHR * 0.8)} - ${Math.round(maxHR * 0.9)} bpm`,
      });
    }
  };

  // Ideal Weight Calculator
  const calculateIdealWeight = () => {
    if (height) {
      const heightInInches = height / 2.54; // Convert cm to inches
      const baseWeight = gender === "male" ? 50 : 45.5;
      const additionalWeight = (heightInInches - 60) * 2.3;
      setIdealWeight((baseWeight + additionalWeight).toFixed(2));
    }
  };

  // Macro Nutrient Split Calculator
  const calculateMacroSplit = () => {
    if (calorieNeeds) {
      const protein = ((calorieNeeds * 0.4) / 4).toFixed(2);
      const carbs = ((calorieNeeds * 0.4) / 4).toFixed(2);
      const fat = ((calorieNeeds * 0.2) / 9).toFixed(2);
      setMacroSplit({ protein, carbs, fat });
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="tools-page">
      <header className="workout-header">
        <h1>FITNESS TOOLS</h1>
        <p>Quick tools to guide you on your health and fitness journey!</p>
      </header>

      <div className="tools-container">
        {/* BMI Calculator */}
        <div className="tool-card">
          <h2>BMI Calculator</h2>
          <p>Calculate your Body Mass Index (BMI).</p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <button onClick={calculateBMI}>Calculate BMI</button>
          </div>
          {bmi && <p>Your BMI: <strong>{bmi}</strong></p>}
        </div>

        {/* Body Fat Calculator */}
        <div className="tool-card">
          <h2>Body Fat Calculator</h2>
          <p>Estimate your body fat percentage.</p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Neck (cm)"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            />
            <input
              type="number"
              placeholder="Waist (cm)"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
            {gender === "female" && (
              <input
                type="number"
                placeholder="Hip (cm)"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
            )}
            <button onClick={calculateBodyFat}>Calculate Body Fat</button>
          </div>
          {bodyFat && <p>Your Body Fat: <strong>{bodyFat}%</strong></p>}
        </div>

        {/* Daily Calorie Needs Calculator */}
        <div className="tool-card">
          <h2>Daily Calorie Needs Calculator</h2>
          <p>
            Calculate how many calories you need per day based on your activity
            level.
          </p>
          <div className="input-group">
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly Active (Light exercise)</option>
              <option value="1.55">Moderately Active (Moderate exercise)</option>
              <option value="1.725">Very Active (Hard exercise)</option>
              <option value="1.9">Extremely Active (Very intense exercise)</option>
            </select>
            <button onClick={calculateCalorieNeeds}>
              Calculate Calorie Needs
            </button>
          </div>
          {calorieNeeds && (
            <p>
              Your daily calorie needs: <strong>{calorieNeeds} calories</strong>
            </p>
          )}
        </div>

        {/* Step to Distance Converter */}
        <div className="tool-card">
          <h2>Step to Distance Converter</h2>
          <p>
            Convert your steps into kilometers based on your stride length.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Number of steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stride length (cm)"
              value={strideLength}
              onChange={(e) => setStrideLength(e.target.value)}
            />
            <button onClick={calculateDistance}>Calculate Distance</button>
          </div>
          {distance && (
            <p>
              Distance walked: <strong>{distance} km</strong>
            </p>
          )}
        </div>

        {/* Heart Rate Zones Calculator */}
        <div className="tool-card">
          <h2>Heart Rate Zones Calculator</h2>
          <p>
            Calculate your optimal heart rate zones for different exercise
            levels.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={calculateHeartRateZones}>
              Calculate Heart Rate Zones
            </button>
          </div>
          {maxHeartRate && (
            <div>
              <p>
                <strong>Zone 1 (Warm-up):</strong> {maxHeartRate.zone1}
              </p>
              <p>
                <strong>Zone 2 (Fat Burn):</strong> {maxHeartRate.zone2}
              </p>
              <p>
                <strong>Zone 3 (Cardio):</strong> {maxHeartRate.zone3}
              </p>
              <p>
                <strong>Zone 4 (Hardcore):</strong> {maxHeartRate.zone4}
              </p>
            </div>
          )}
        </div>

        {/* Ideal Weight Calculator */}
        <div className="tool-card">
          <h2>Ideal Weight Calculator</h2>
          <p>
            Calculate your ideal weight based on your height and gender.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button onClick={calculateIdealWeight}>Calculate Ideal Weight</button>
          </div>
          {idealWeight && (
            <p>
              Your ideal weight: <strong>{idealWeight} kg</strong>
            </p>
          )}
        </div>

        {/* Macro Nutrient Split Calculator */}
        <div className="tool-card">
          <h2>Macro Nutrient Split Calculator</h2>
          <p>
            Calculate your daily protein, carbohydrate, and fat needs based on
            your calorie goals.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Total Calories (cal/day)"
              value={calorieNeeds}
              onChange={(e) => setCalorieNeeds(e.target.value)}
            />
            <button onClick={calculateMacroSplit}>Calculate Macro Split</button>
          </div>
          {macroSplit && (
            <div>
              <p>
                <strong>Protein:</strong> {macroSplit.protein} g
              </p>
              <p>
                <strong>Carbs:</strong> {macroSplit.carbs} g
              </p>
              <p>
                <strong>Fat:</strong> {macroSplit.fat} g
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>

  );
};

export default ToolForUser;
