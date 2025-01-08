import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkoutPlan.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const WorkoutPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null); // Lưu kế hoạch tập luyện
  const [selectedDay, setSelectedDay] = useState(null); // Lưu ngày tập luyện được chọn
  const [selectedExercise, setSelectedExercise] = useState(null); // Lưu bài tập được chọn
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi khi gọi API
  const [authenticated, setAuthenticated] = useState(true); // Kiểm tra người dùng đã đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthenticated(false); // Nếu không có token, chuyển hướng
      return;
    }

    const fetchWorkoutPlan = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/workout-plans/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Workout Plan Response:', response.data);
        const workoutData = response.data.weeklyWorkoutPlan;
        setWorkoutPlan(workoutData);

        // Đặt ngày đầu tiên làm mặc định nếu có danh sách ngày
        if (workoutData.week && workoutData.week.length > 0) {
          setSelectedDay(workoutData.week[0].day);
        }
      } catch (err) {
        console.error('Error fetching workout plan:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  const getWorkoutsForDay = (day) => day.workouts || [];

  const handleExerciseClick = (exercise) => {
    console.log('Selected Exercise:', exercise);
    setSelectedExercise(exercise);
  };

  // Nếu chưa đăng nhập, hiển thị thông báo và chuyển hướng
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

      <div className="workout-header">
        <h1>WORKOUT PLANS</h1>
      </div>

      <div className="workout-plan-container">
        <div className="workout-wrapper">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div>
              <div className="workout-week-container">
                <ul className="workout-day-list">
                  {workoutPlan?.week?.map((day, index) => (
                    <li
                      key={index}
                      className={`workout-day-item ${selectedDay === day.day ? 'active' : ''}`}
                      onClick={() => setSelectedDay(day.day)}
                    >
                      {day.day}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="workout-day-container">
                {selectedDay ? (
                  <div className="exercise-list-container grid">
                    {workoutPlan.week.map((day) => {
                      if (day.day === selectedDay) {
                        return (
                          <div key={day.day}>
                            {getWorkoutsForDay(day).map((exercise) => (
                              <div
                                key={exercise._id}
                                className="workout-daily-item"
                                onClick={() => handleExerciseClick(exercise)}
                              >
                                <h3>{exercise.title}</h3>
                                <p>{exercise.workout_title} mins</p>
                                <p>Duration: {exercise.duration} mins</p>
                                <p>Intensity: {exercise.intensity}</p>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <p>Please select a day to see the workouts.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedExercise && (
          <div className="exercise-detail-modal">
            <div className="modal-container">
              <div className="modal-header">
                <h2>{selectedExercise.title}</h2>
                <button className="close-btn" onClick={() => setSelectedExercise(null)}>
                  &times;
                </button>
              </div>
              <div>
                <p><strong>Title:</strong> {selectedExercise.workout_title}</p>
                <p><strong>Type:</strong> {selectedExercise.type}</p>
                <p><strong>Duration:</strong> {selectedExercise.duration} mins</p>
                <p><strong>Intensity:</strong> {selectedExercise.intensity}</p>
                <p><strong>Description:</strong> {selectedExercise.description}</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setSelectedExercise(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WorkoutPlan;
