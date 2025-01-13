import React, { useState } from "react";
import "./Notification.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      message: "Bạn đã hoàn thành bài tập luyện hôm nay!",
      from: "System",
      time: "2 phút trước",
      read: false,
    },
    {
      message: "Kế hoạch bữa ăn mới đã sẵn sàng.",
      from: "Admin",
      time: "1 giờ trước ",
      read: true,
    },
    {
      message: "Kiểm tra bài đăng mới nhất.",
      from: "System",
      time: "Hôm qua ",
      read: false,
    },
  ]);

  const handleNotificationClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowNotifications(!showNotifications);
    } else {
      navigate("/login");
    }
  };

  const handleMarkAllRead = () => {
    // Logic đánh dấu tất cả là đã đọc (nếu có backend hoặc state)
    console.log("Mark all notifications as read");
  };

  return (
    <div className="notification-container">
      {/* Bell Icon */}
      <IoIosNotificationsOutline
        className="navbar-logo-icon"
        onClick={handleNotificationClick}
      />

      {/* Dropdown Notifications */}
      {showNotifications && (
        <div className="notification-dropdown">
          {/* Header */}
          <div className="notification-header">
            <span>THÔNG BÁO </span>
            <button onClick={handleMarkAllRead} className="mark-read-btn">
              ĐỌC TẤT CẢ 
            </button>
          </div>

          {/* Notifications List */}
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <div
                  key={index}
                  className={`notification-item ${item.read ? "read" : "unread"}`}
                >
                  <div className="notification-content">
                    <div className="notification-avatar">
                      {item.from === "Admin" ? "🛠️" : "🔔"}
                    </div>
                    <div>
                      <p className="notification-message">{item.message}</p>
                      <span className="notification-from">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="notification-empty">KHÔNG CÓ THÔNG BÁO MỚI </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
