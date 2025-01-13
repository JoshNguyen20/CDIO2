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
        console.error('Lỗi khi lấy kế hoạch tập luyện:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  const weeklyWeightData = {
    labels: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'],
    datasets: [
      {
        label: 'Tiến độ Cân Nặng (kg)',
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
          <h2>Bạn cần đăng nhập để truy cập trang này.</h2>
          <button className="navigate-button" onClick={() => navigate('/login')}>
          Đi đến Đăng nhập
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
        <h1>Theo dõi tiến độ</h1>
      </header>
      <div className="progress-tracking-container">
        <section className="overview-section">
          <div className="progress-card">
            <h3>Calorie đã đốt cháy</h3>
            <p>1850 kcal</p>
          </div>
          <div className="progress-card">
            <h3>Tổng thời gian tập luyện</h3>
            <p>5 giờ 20 phút  </p>
          </div>
          <div className="progress-card">
            <h3>Cân nặng hiện tại</h3>
            <p>69 kg</p>
          </div>
          <div className="progress-card">
            <h3>Cân nặng mục tiêu</h3>
            <p>65 kg</p>
          </div>
        </section>

        <section className="chart-section">
          <h2>Tiến độ hàng tuần</h2>
          <Line data={weeklyWeightData} />
        </section>

        <section className="history-section">
          <h2>Lịch sử hoạt động</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : pastWorkouts.length > 0 ? (
            pastWorkouts.map((day, index) => (
              <div key={index} className="history-card">
                <h4>{day.day}</h4>
                {day.workouts.map((workout, idx) => (
                  <p key={idx}>
                    {workout.title} - {workout.duration} phút 
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>Lịch sử hoạt động.</p>
          )}
        </section>

        <section className="current-section">
          <h2>Bài tập hôm nay</h2>
          {currentWorkouts.length > 0 ? (
            currentWorkouts.map((day, index) => (
              <div key={index} className="history-card">
                <h4>{day.day}</h4>
                {day.workouts.map((workout, idx) => (
                  <p key={idx}>
                    {workout.title} - {workout.duration} phútphút
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>Không có bài tập cho hôm nay.</p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
