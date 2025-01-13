import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Stepper from "../../Components/Stepper/Stepper";
import "./LoadingPageStyles.css";

const LoadingPage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Ingredients",
  ];

  const [activeDay, setActiveDay] = useState(0); // State to track the active day
  const navigate = useNavigate(); // Hook to navigate

  // Get the token from localStorage
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // If no token is found, redirect to login page
      navigate("/login"); // Redirect to login page if token is missing
      return;
    }

    if (activeDay < days.length) {
      // Create interval to increment activeDay
      const interval = setInterval(() => {
        setActiveDay((prev) => prev + 1); // Increment the active day
      }, 1000); // Every second
      return () => clearInterval(interval); // Clear interval on unmount
    } else {
      // When all circles are completed, navigate to the "complete" page
      navigate("/plans");
    }
  }, [activeDay, days.length, navigate]); // Include activeDay to track changes

  return (
    <div className="loading-container">
      <div className="loading-header">
        <Stepper currentStep={2} />
        <h1>Chờ một chút, chúng tôi đang chuẩn bị kế hoạch cho bạn!</h1>
        <p>
        Trí tuệ nhân tạo của chúng tôi đang làm việc chăm chỉ để xây dựng kế hoạch hoàn chỉnh và tùy chỉnh cho bạn, vì vậy có thể mất một chút thời gian.
        </p>
      </div>
      <div className="loading-days">
        {days.map((day, index) => (
          <div key={index} className="day-row">
            <span>{day}</span>
            <span
              className={`loading-circle ${
                index <= activeDay ? "completed" : "pending"
              }`}
            ></span>
          </div>
        ))}
      </div>
      <div className="loading-footer">
        <p>
        Trang này sẽ tự động làm mới khi kế hoạch của bạn đã sẵn sàng. Hầu hết các kế hoạch mất từ <strong>2 đến 5 phút</strong> trung bình để hoàn tất. Tuy nhiên, vẫn nhanh hơn so với nếu bạn làm điều này thủ công!
        </p>
        <a href="/" className="retry-link">
        Mất hơn 10 phút? Hãy khởi động lại quá trình.
        </a>
        <div className="info-box">
        Bạn có biết rằng việc tiêu thụ chế độ ăn giàu trái cây và rau củ có thể giúp giảm nguy cơ phát triển các bệnh mãn tính như bệnh tim, đột quỵ và một số loại ung thư?
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
