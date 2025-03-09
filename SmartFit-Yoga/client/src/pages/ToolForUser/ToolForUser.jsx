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
    if (gender === "Nam" && neck && waist && height) {
      const result =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
      setBodyFat(result.toFixed(2));
    } else if (gender === "Nữ" && neck && waist && hip && height) {
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
      if (gender === "Nam ") {
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
      const baseWeight = gender === "nam " ? 50 : 45.5;
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
        <h1>CÔNG CỤ TÍNH TOÁN TỈ LỆ </h1>
        <p>Công cụ tính toán nhanh chóng để hướng dẫn bạn trên hành trình cải thiện sức khỏe và thể hình của mình!</p>
      </header>

      <div className="tools-container">
        {/* BMI Calculator */}
        <div className="tool-card">
          <h2>Máy tính BMI</h2>
          <p>Tính chỉ số khối cơ thể (BMI) của bạn.</p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Cân Nặng  (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Chiều Cao  (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <button onClick={calculateBMI}>Máy tính BMI</button>
          </div>
          {bmi && <p>Chỉ số BMI của bạn: <strong>{bmi}</strong></p>}
        </div>

        {/* Body Fat Calculator */}
        <div className="tool-card">
          <h2>Tính lượng mỡ cơ thể</h2>
          <p>Ước tính tỷ lệ mỡ cơ thể của bạn.</p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Cổ  (cm)"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            />
            <input
              type="number"
              placeholder="Eo  (cm)"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
            {gender === "Nữ " && (
              <input
                type="number"
                placeholder="Hông  (cm)"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
            )}
            <button onClick={calculateBodyFat}>Tính lượng mỡ cơ thể</button>
          </div>
          {bodyFat && <p>Lượng mỡ cơ thể của bạn: <strong>{bodyFat}%</strong></p>}
        </div>

        {/* Daily Calorie Needs Calculator */}
        <div className="tool-card">
          <h2>Tính nhu cầu calo hằng ngày</h2>
          <p>
          Tính toán lượng calo bạn cần mỗi ngày dựa trên mức độ hoạt động của bạn.
          </p>
          <div className="input-group">
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="1.2">Ít vận động (Ít hoặc không có bài tập thể dục)</option>
              <option value="1.375">Hoạt động nhẹ (Tập thể dục nhẹ)</option>
              <option value="1.55">Hoạt động vừa phải (Tập thể dục vừa phải)</option>
              <option value="1.725">Rất hoạt động (Tập thể dục nặng)</option>
              <option value="1.9">Cực kỳ hoạt động (Tập thể dục rất cường độ cao)</option>
            </select>
            <button onClick={calculateCalorieNeeds}>
            Tính nhu cầu calo hằng ngày
            </button>
          </div>
          {calorieNeeds && (
            <p>
            Nhu cầu calo hằng ngày của bạn: <strong>{calorieNeeds} calories</strong>
            </p>
          )}
        </div>

        {/* Step to Distance Converter */}
        <div className="tool-card">
          <h2>Bước đi</h2>
          <p>
          Chuyển đổi số bước chân của bạn thành kilômét dựa trên độ dài sải chân.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Số bước đi "
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            <input
              type="number"
              placeholder="Chiều dài sải chân (cm)"
              value={strideLength}
              onChange={(e) => setStrideLength(e.target.value)}
            />
            <button onClick={calculateDistance}>Tính toán khoảng cách</button>
          </div>
          {distance && (
            <p>
            Khoảng cách đã đi: <strong>{distance} km</strong>
            </p>
          )}
        </div>

        {/* Heart Rate Zones Calculator */}
        <div className="tool-card">
          <h2>Đo Nhịp Tim </h2>
          <p>
          Tính toán vùng nhịp tim tối ưu của bạn cho các mức độ tập luyện khác nhau
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Tuổi "
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={calculateHeartRateZones}>
              Tính toán nhịp tim 
            </button>
          </div>
          {maxHeartRate && (
            <div>
              <p>
                <strong>Khởi động</strong> {maxHeartRate.zone1}
              </p>
              <p>
                <strong>Đốt mỡ:</strong> {maxHeartRate.zone2}
              </p>
              <p>
                <strong>Cardio:</strong> {maxHeartRate.zone3}
              </p>
              <p>
                <strong>Cường độ cao:</strong> {maxHeartRate.zone4}
              </p>
            </div>
          )}
        </div>

        {/* Ideal Weight Calculator */}
        <div className="tool-card">
          <h2>Tính cân nặng lý tưởng</h2>
          <p>
          Tính toán cân nặng lý tưởng của bạn dựa trên chiều cao và giới tính.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Chiều cao  (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Nam ">Nam </option>
              <option value="Nữ ">Nữ </option>
            </select>
            <button onClick={calculateIdealWeight}>Tính cân nặng lý tưởng</button>
          </div>
          {idealWeight && (
            <p>
            Cân nặng lý tưởng của bạn: <strong>{idealWeight} kg</strong>
            </p>
          )}
        </div>

        {/* Macro Nutrient Split Calculator */}
        <div className="tool-card">
          <h2>Tính phân chia dinh dưỡng</h2>
          <p>
          Tính toán nhu cầu protein, carbohydrate và chất béo hàng ngày của bạn dựa trên mục tiêu calo.
          </p>
          <div className="input-group">
            <input
              type="number"
              placeholder="Tổng lượng Calories (cal/ngày )"
              value={calorieNeeds}
              onChange={(e) => setCalorieNeeds(e.target.value)}
            />
            <button onClick={calculateMacroSplit}>Tính phân chia dinh dưỡng</button>
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
