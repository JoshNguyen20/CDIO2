import React, { useState } from "react";
import "./Notification.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      message: "You have completed today's workout!",
      from: "System",
      time: "2 minutes ago",
      read: false,
    },
    {
      message: "New meal plan is ready.",
      from: "Admin",
      time: "1 hour ago",
      read: true,
    },
    {
      message: "Check out the latest post.",
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
    // Logic to mark all as read (if backend or state is available)
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
            <span>NOTIFICATIONS</span>
            <button onClick={handleMarkAllRead} className="mark-read-btn">
              MARK ALL AS READ
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
              <div className="notification-empty">NO NEW NOTIFICATIONS</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
