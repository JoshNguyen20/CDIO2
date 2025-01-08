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
          <p className="faded-text small-text">Your ultimate fitness companion for personalized workout and nutrition plans.</p>
        </div>
        <div className="footer-section">
          <h3>Programs</h3>
          <p className="footer-effect" onClick={() => navigate('/workout-plans')}>Workout Plans</p>
          <p className="footer-effect" onClick={() => navigate('/meal-plans')}>Nutrition Plans</p>
          <p className="footer-effect" onClick={() => navigate('/tracking')}>Tracking</p>
        </div>
        <div className="footer-section">
          <h3>Explore</h3>
          <p className="footer-effect" onClick={() => navigate('/blogs')}>Our Blogs</p>
          <p className="footer-effect" onClick={() => navigate('/tools')}>Tools For User</p>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <p className="footer-effect" onClick={() => navigate('/about')}>Careers</p>
          <p className="footer-effect" onClick={() => navigate('/about')}>Tutorials</p>
          <p className="footer-effect" onClick={() => navigate('/our-team')}>Our Team</p>
        </div>
        <div className="footer-section ">
          <div className="contact">
            <h3>Contact</h3>
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
        <p className="faded-text">&copy; {currentYear} SmartFit & Yoga. All rights reserved. <a href="https://example.com" aria-label="Terms of Use">Terms of Use</a> <a href="https://example.com" aria-label="Privacy Policy">Privacy Policy</a></p>
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
