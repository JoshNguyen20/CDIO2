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
            <h1>Create a plan for your health</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Weight (kg):</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Height (cm):</label>
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Goal:</label>
                    <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a goal</option>
                        <option value="Lose weight">Lose weight</option>
                        <option value="Gain muscle">Gain muscle</option>
                        <option value="Maintain weight">Maintain weight</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>

            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <h2>Error:</h2>
                    <p>{typeof error === 'string' ? error : JSON.stringify(error, null, 2)}</p>
                </div>
            )}
        </div>
    );
};

export default CreatePage;
