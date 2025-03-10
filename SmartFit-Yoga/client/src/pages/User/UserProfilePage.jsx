import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfilePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        const formattedData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          created_at: new Date(data.createdAt).toLocaleString(),
          updated_at: new Date(data.updatedAt).toLocaleString(),
          //gender: "Not specified", // Default value, can be updated
          age: 0,
          weight: 0,
          height: 0,
        };

        setUser(formattedData);
        setFormData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // const handleEdit = () => {
  //   setIsModalOpen(true);
  // };

  const handleSave = () => {
    setUser({ ...formData, updated_at: new Date().toLocaleString() });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="workout-header">
        <h1>Thông Tin</h1>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-container">
            <img
              src={user.gender === "male" ? "./man.png" : "./woman.png"}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <p>
            <strong>Tên :</strong> {user.name}
          </p>
          {/* <p>
            <strong>Gender:</strong> {user.gender}
          </p> */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Vị trí :</strong> {user.role}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {user.created_at}
          </p>
          <p>
            <strong>Ngày cập nhật:</strong> {user.updated_at}
          </p>
          <div className="buttonstyle">
            {/* <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button> */}
            <button className="logout-btn" onClick={handleLogout}>
              Đăng Xuất 
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="profile-field">
            <label>Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Giới tính:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Nam </option>
              <option value="female">Nữ </option>
            </select>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Tuổi :</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Cân Nặng :</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Chiều Cao :</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="profile-buttons">
            <button className="save-btn" onClick={handleSave}>
              Lưu 
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Hủy 
            </button>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

const Modal = ({ onClose, children }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
    </div>
  </div>
);

export default UserProfilePage;
