import React from "react";
import BackGround from "./BackGround.jsx";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./HomePage.css";
//import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";

export default function LandingPage() {
    //const navigate = useNavigate();

    // Hàm xử lý đăng xuất
    // const handleLogout = () => {
    //     localStorage.removeItem("token"); // Xóa token khỏi localStorage
    //     localStorage.removeItem("user"); // Xóa thông tin người dùng
    //     toast.success("Logged out successfully!"); // Hiển thị thông báo thành công
    //     navigate("/login"); // Chuyển hướng về trang đăng nhập
    // };

    return (
        <div className="home-page">
            <Navbar />
            <BackGround />
            <div className="content">
                {/* <h1>Welcome to the Home Page</h1> */}
                {/* <button onClick={handleLogout} className="logout-button">
                    Logout
                </button> */}
            </div>
            <Footer />
        </div>
    );
}
