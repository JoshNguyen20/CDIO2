import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GeneratorPlans.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const GeneratorPlansPage = () => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "1",
        weight: "",
        height: "",
        goal: "Build Muscle",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [authenticated, setAuthenticated] = useState(true); // State để kiểm tra xác thực
    const navigate = useNavigate();

    // Kiểm tra token để xác thực
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuthenticated(false); // Người dùng chưa đăng nhập
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Thiếu mã thông báo. Vui lòng đăng nhập.");
            }

            const mealPlanPayload = {
                age: parseInt(formData.age, 10),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
            };

            const workoutPlanPayload = {
                age: parseInt(formData.age, 10),
                gender: parseInt(formData.gender, 10),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                goal: formData.goal,
            };

            await Promise.all([
                axios.post("http://localhost:5000/api/meal-plans/predict", mealPlanPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }),
                axios.post(
                    "http://localhost:5000/api/workout-plans/generate-weekly-workout-plan",
                    workoutPlanPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                ),
            ]);

            setSuccess(true);
        } catch (err) {
            const errorMessage = err.response
                ? err.response.data.error || JSON.stringify(err.response.data)
                : err.message || "Đã xảy ra lỗi.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Nếu chưa đăng nhập, hiển thị thông báo và chuyển hướng
    if (!authenticated) {
        return (
            <div>
                <Navbar />
                <div className="auth-message-container">
                    <h2>Bạn cần đăng nhập để truy cập trang này.</h2>
                    <button className="navigate-button" onClick={() => navigate("/login")}>
                    Đi đến trang Đăng nhập
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
                <h1>TẠO KẾ HOẠCH CỦA BẠN</h1>
            </div>
            <div className="generator-container">
                <form className="generator-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="generator-label">Tuổi:</label>
                        <input
                            className="generator-input"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập tuổi của bạn"
                        />
                    </div>

                    <div className="form-group">
                        <label className="generator-label">Giới tính:</label>
                        <select
                            className="generator-select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="generator-label">Cân nặng (kg):</label>
                        <input
                            className="generator-input"
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập cân nặng của bạn"
                        />
                    </div>

                    <div className="form-group">
                        <label className="generator-label">Chiều Cao (cm):</label>
                        <input
                            className="generator-input"
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập chiều cao của bạn"
                        />
                    </div>

                    <div className="form-group">
                        <label className="generator-label">Mục Tiêu:</label>
                        <select
                            className="generator-select"
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Build Muscle">Tăng cơ</option>
                            <option value="Lose Weight">Giảm cân</option>
                            <option value="Maintain Weight">Duy trì cân nặng</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Generating..." : "Tạo Kế Hoạch"}
                    </button>
                </form>

                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                )}

                {success && (
                    <div className="success-overlay">
                        <div className="success-box">
                            <h2>Thành công!</h2>
                            <p>Kế hoạch của bạn đã được tạo thành công.</p>
                            <div className="button-group">
                                <button
                                    className="navigate-button"
                                    onClick={() => navigate("/workout-plans")}
                                >
                                    Đi đến Kế Hoạch Tập Luyện
                                </button>
                                <button
                                    className="navigate-button"
                                    onClick={() => navigate("/meal-plans")}
                                >
                                    Đi đến Kế Hoạch Dinh Dưỡng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <h2>Error:</h2>
                        <p>{error}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default GeneratorPlansPage;
