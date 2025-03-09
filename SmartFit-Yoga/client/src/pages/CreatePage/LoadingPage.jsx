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
        <h1>Please wait a moment, we are preparing a plan for you!</h1>
        <p>
          Our artificial intelligence is working hard to build a complete and customized plan for you, so it may take some time.
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
          This page will automatically refresh when your plan is ready. Most plans take an average of <strong>2 to 5 minutes</strong> to complete. However, it is still faster than if you did it manually!
        </p>
        <a href="/" className="retry-link">
          Taking more than 10 minutes? Restart the process.
        </a>
        <div className="info-box">
          Did you know that consuming a diet rich in fruits and vegetables can help reduce the risk of developing chronic diseases such as heart disease, stroke, and some types of cancer?
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
