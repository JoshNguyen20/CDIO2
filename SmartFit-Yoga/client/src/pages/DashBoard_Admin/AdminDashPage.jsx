import React, { useState } from 'react';
import './AdminDashPage.css';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import ManageUser from '../../Components/ManageUser/ManageUser';

const AdminDashPage = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleNavbarToggle = (hidden) => {
    setIsNavbarHidden(hidden);
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  // Nội dung tương ứng cho từng mục
  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard/>;
      case 'user':
        return <ManageUser />;
      case 'notification':
        return <div><h2>Notifications</h2><p>View all notifications here.</p></div>;
      case 'tools':
        return <div><h2>Tools</h2><p>Access tools and utilities.</p></div>;
      case 'security':
        return <div><h2>Security</h2><p>Configure security settings.</p></div>;
      case 'faq':
        return <div><h2>FAQ</h2><p>Frequently Asked Questions.</p></div>;
      default:
        return <Dashboard/>;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar onToggle={handleNavbarToggle} onMenuSelect={handleMenuSelect} />
      
      <div className={`admin-content ${isNavbarHidden ? 'expanded' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashPage;
