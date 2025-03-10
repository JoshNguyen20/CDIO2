import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Notification from "../Notification/Notification";

const Navbar = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="logo.png" alt="Logo" />
        </a>
      </div>
      <div className="spacer"></div>
      <div className="navbar-links">
        <a href="/generator" className="navbar-a">
          TẠO KẾ HOẠCH
        </a>
        <a href="/workout-plans" className="navbar-a">
          KẾ HOẠCH TẬP LUYỆN
        </a>
        <a href="/meal-plans" className="navbar-a">
        KẾ HOẠCH DINH DƯỠNG
        </a>
        <a href="/tracking" className="navbar-a">
          THEO DÕI TIẾN ĐỘ
        </a>
        <a href="/about" className="navbar-a">
          GIỚI THIỆU
        </a>
        
      </div>
      <div className="spacer"></div>
      <div className="navbar-search-container">
        <CiSearch className="fas fa-search navbar-search-icon" />
        <input type="text" className="navbar-search" placeholder="Tìm kiếm..." />
      </div>
      {/* Dropdown Notification */}
      <Notification/>
      {/* User Icon */}
      <a onClick={handleUserClick} className="navbar-logo-icon">
        <CiUser />
      </a>
    </nav>
  );
};

export default Navbar;
