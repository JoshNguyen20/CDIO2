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
        <h1>Sit tight, we're cooking up your plan</h1>
        <p>
          Our AI is hard at work building your fully curated and customised
          plan, so it can take a little bit of time.
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
          This page will automatically refresh when your plan is ready. Most
          plans take between <strong>2 to 5 minutes</strong> on average to
          finalise. It's still faster than if you were to do this manually!
        </p>
        <a href="/" className="retry-link">
          Taking longer than 10 minutes? Restart the process.
        </a>
        <div className="info-box">
          Did you know that consuming a diet high in fruits and vegetables can
          help reduce your risk of developing chronic diseases such as heart
          disease, stroke, and certain types of cancer?
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
