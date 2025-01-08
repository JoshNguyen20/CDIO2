import React, { useState } from "react";
import "./Notification.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      message: "You completed your workout today!",
      from: "System",
      time: "2 mins ago",
      read: false,
    },
    {
      message: "New meal plan is ready.",
      from: "Admin",
      time: "1 hour ago",
      read: true,
    },
    {
      message: "Check out the latest blog post.",
      from: "System",
      time: "Yesterday",
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
            <span>Notifications</span>
            <button onClick={handleMarkAllRead} className="mark-read-btn">
              Mark all as read
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
              <div className="notification-empty">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
