import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './ProgressTracking.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const ProgressTracking = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [pastWorkouts, setPastWorkouts] = useState([]);
  const [currentWorkouts, setCurrentWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthenticated(false);
      return;
    }

    const fetchWorkoutPlan = async () => {
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:5000/api/workout-plans/my', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workoutData = response.data.weeklyWorkoutPlan;
        setWorkoutPlan(workoutData);

        const today = new Date();
        const todayDayIndex = today.getDay();

        const past = [];
        const current = [];

        workoutData.week.forEach((day) => {
          const dayIndex = new Date(day.date).getDay();

          if (dayIndex < todayDayIndex) {
            past.push(day);
          } else if (dayIndex === todayDayIndex) {
            current.push(day);
          }
        });

        setPastWorkouts(past);
        setCurrentWorkouts(current);
      } catch (err) {
        console.error('Error fetching workout plan:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  const weeklyWeightData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Weight Progress (kg)',
        data: [70.5, 70.3, 70.0, 69.8, 69.5, 69.2, 69.0],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  if (!authenticated) {
    return (
      <div>
        <Navbar />
        <div className="auth-message-container">
          <h2>You need to log in to access this page.</h2>
          <button className="navigate-button" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <header className="workout-header">
        <h1>Progress Tracking</h1>
      </header>
      <div className="progress-tracking-container">
        <section className="overview-section">
          <div className="progress-card">
            <h3>Calories Burned</h3>
            <p>1850 kcal</p>
          </div>
          <div className="progress-card">
            <h3>Total Workout Time</h3>
            <p>5 hrs 20 mins</p>
          </div>
          <div className="progress-card">
            <h3>Current Weight</h3>
            <p>69 kg</p>
          </div>
          <div className="progress-card">
            <h3>Target Weight</h3>
            <p>65 kg</p>
          </div>
        </section>

        <section className="chart-section">
          <h2>Weekly Progress</h2>
          <Line data={weeklyWeightData} />
        </section>

        <section className="history-section">
          <h2>Activity History</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : pastWorkouts.length > 0 ? (
            pastWorkouts.map((day, index) => (
              <div key={index} className="history-card">
                <h4>{day.day}</h4>
                {day.workouts.map((workout, idx) => (
                  <p key={idx}>
                    {workout.title} - {workout.duration} mins
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No past workouts found.</p>
          )}
        </section>

        <section className="current-section">
          <h2>Today's Workouts</h2>
          {currentWorkouts.length > 0 ? (
            currentWorkouts.map((day, index) => (
              <div key={index} className="history-card">
                <h4>{day.day}</h4>
                {day.workouts.map((workout, idx) => (
                  <p key={idx}>
                    {workout.title} - {workout.duration} mins
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No workouts for today.</p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
