import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate(); // Hook dùng để điều hướng

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo">
          <h1 className="footer-logo">
            <img src={'/logo.png'} alt="logo" className="footer-logo-img" />
          </h1>
          <p className="faded-text">Build Your Body™</p>
          <p className="faded-text small-text">Người bạn đồng hành thể hình lý tưởng của bạn với các kế hoạch tập luyện và dinh dưỡng được cá nhân hóa.</p>
        </div>
        <div className="footer-section">
          <h3>CHƯƠNG TRÌNH </h3>
          <p className="footer-effect" onClick={() => navigate('/workout-plans')}>Kế Hoạch Tập Luyện </p>
          <p className="footer-effect" onClick={() => navigate('/meal-plans')}>Kế hoạch dinh dưỡng </p>
          <p className="footer-effect" onClick={() => navigate('/tracking')}>Theo Dõi </p>
        </div>
        <div className="footer-section">
          <h3>KHÁM PHÁ </h3>
          <p className="footer-effect" onClick={() => navigate('/blogs')}> Blogs</p>
          <p className="footer-effect" onClick={() => navigate('/tools')}>Công Cụ Tính Toán Tỉ Lệ Cơ Thể </p>
        </div>
        <div className="footer-section">
          <h3>GIỚI THIỆU </h3>
          <p className="footer-effect" onClick={() => navigate('/about')}>Chúng tôi là ai </p>
          <p className="footer-effect" onClick={() => navigate('/about')}> Hướng Dẫn </p>
          <p className="footer-effect" onClick={() => navigate('/our-team')}>Thành Viên </p>
        </div>
        <div className="footer-section ">
          <div className="contact">
            <h3>LIÊN HỆ </h3>
            <p className="footer-effect">Phone: +123 456 7890</p>
            <p className="footer-effect">Email: info@example.com</p>
          </div>
          <iframe
              title="unique-title"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15241.940763764467!2d108.15773895147345!3d16.044031977871516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421938d61a3ce5%3A0x29d80f3ebbdcb44a!2sDuy%20Tan%20University%2C%20South%20Hoa%20Khanh!5e0!3m2!1sen!2s!4v1729600872166!5m2!1sen!2s"
              className="responsive-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
      <div className="footer-bottom">
        <hr className="footer-separator" />
        <p className="faded-text">&copy; {currentYear} SmartFit & Yoga. Tất cả các quyền được bảo lưu. <a href="https://example.com" aria-label="Terms of Use">Điều khoản sử dụng</a> <a href="https://example.com" aria-label="Privacy Policy">Chính sách bảo mật</a></p>
        <div className="social-links">
          <a href="/home" aria-label="YouTube"><FaYoutube /></a>
          <a href="/home" aria-label="Pinterest"><FaPinterest /></a>
          <a href="/home" aria-label="Facebook"><FaFacebookF /></a>
          <a href="/home" aria-label="Instagram"><FaInstagram /></a>
          <a href="/home" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
