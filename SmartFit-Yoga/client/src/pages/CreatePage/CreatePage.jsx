import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const CreatePage = () => {
    const [formData, setFormData] = useState({ age: '', weight: '', height: '', goal: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token is missing. Please log in.');
            }

            // Prepare the payloads for both APIs
            const mealPlanPayload = {
                age: parseInt(formData.age, 10), // Convert age to integer
                weight: parseFloat(formData.weight), // Convert weight to float
                height: parseFloat(formData.height), // Convert height to float
            };

            const workoutPlanPayload = {
                age: parseInt(formData.age, 10), // Convert age to integer
                weight: parseFloat(formData.weight), // Convert weight to float
                goal: formData.goal, // Use the goal field
            };

            // Send requests to both APIs
            const [mealPlanResponse, workoutPlanResponse] = await Promise.all([
                axios.post('http://localhost:5000/api/meal-plans/predict', mealPlanPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
                axios.post('http://localhost:5000/api/workout-plans/generate-weekly-workout-plan', workoutPlanPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            console.log('Meal Plan Response:', mealPlanResponse.data);
            console.log('Workout Plan Response:', workoutPlanResponse.data);

            // If both are successful, navigate to "/"
            navigate('/');
        } catch (err) {
            // Display error message
            const errorMessage = err.response
                ? (err.response.data.error || JSON.stringify(err.response.data))
                : err.message || 'An error occurred.';
            setError(errorMessage);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1>Tạo kế hoạch cho sức khỏe của bạn</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Tuổi:</label>
                    <input
                        type="number"
                        name="Tuổi "
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Cân Nặng (kg):</label>
                    <input
                        type="number"
                        name="Cân Nặng "
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Chiều Cao  (cm):</label>
                    <input
                        type="number"
                        name="Chiều Cao "
                        value={formData.height}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Mục Tiêu:</label>
                    <select
                        name="Mục Tiêu "
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn một mục tiêu</option>
                        <option value="Giảm cân">Giảm cân</option>
                        <option value="Tăng cơ">Tăng cơ</option>
                        <option value="Duy trì cân nặng">Duy trì cân nặng</option>
                    </select>
                </div>
                <button type="Gửi">Gửi</button>
            </form>

            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <h2>Lỗi:</h2>
                    <p>{typeof error === 'string' ? error : JSON.stringify(error, null, 2)}</p>
                </div>
            )}
        </div>
    );
};

export default CreatePage;
