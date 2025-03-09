import React from 'react';
import './AboutPage.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <section className="about-us-header">
        <h2>ABOUT US</h2>
        <p className="header__content">"Training is not just about muscles or the weights you lift, but about the journey of enhancing both physical and mental health. Our web product is designed to accompany you every step of the way. With personalized training programs, detailed progress tracking, and a vibrant support community, we help you not only achieve your goals but also maintain motivation every day. Whether you are a beginner or have experience, let us help you conquer the peak of health and fitness."
        </p>
      </section>

      <div className="new-container">
        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image">
              <img src="/img1.jpg" alt="Our Story" />
            </div>
            <div className="about-text">
              <h3 style={{marginLeft: '40px'}}>WHO WE ARE</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Who are we? SmartFit was founded with the mission to make sports training accessible and positively transformative for everyone. From a passion to help people achieve their health goals, we have grown into a dynamic community where advanced training techniques and personalized coaching programs blend perfectly. We are committed to building an inclusive environment where every member feels encouraged to become the best version of themselves, whether through strength training, cardio, or yoga. At SmartFit, we are not just a fitness center—we are a family dedicated to your development and health.
              </p>
            </div>
          </div>
        </section>

        <section className="about-us-section reverse">
          <div className="about-section-content">
            <div className="about-text">
              <h3 style={{marginRight: '40px'}}>OUR VISION</h3>
              <p className="about-text" style={{marginRight: '40px'}}>At SmartFit, our vision is to create a thriving community where physical training is not just a goal but a lifestyle. We believe that everyone, starting from any point, deserves the opportunity to live healthier, stronger, and more balanced lives. By combining advanced training methods with holistic health practices, we aim to inspire and empower each individual to confidently embark on their own physical journey. Our goal is to build an inclusive space where people can connect, grow, and transform together, nurturing both physical strength and mental resilience.
              </p>
            </div>
            <div className="about-image" style={{marginLeft: '40px'}}>
              <img src="/img2.jpg" alt="Our Vision" />
            </div>
          </div>
        </section>

        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image" style={{marginRight: '40px'}}>
              <img src="/img3.jpg" alt="Our Mission" />
            </div>
            <div className="about-text">
              <h3 style={{marginLeft: '40px'}}>OUR MISSION</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>SmartFit's mission is to provide personalized and innovative training solutions suitable for all fitness levels. We are dedicated to combining the essence of strength training, cardiovascular health, and yoga to offer a comprehensive approach to wellness. With a focus on building sustainable habits, we support each member in achieving their individual goals—whether it's improving fitness, enhancing mindfulness, or boosting overall health. At SmartFit, we are committed to providing the tools, guidance, and community necessary for you to achieve long-term success both physically and mentally.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
