import React from 'react';
import './AboutPage.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <section className="about-us-header" >
        <h2>About US</h2>
        <p className="header__content">It is very important for the customer to pay attention to the adipiscing process.
         Providence to assume the whole exercise of praise is, to some, rejected by the consequences of accusers, 
         and no one follows the pain more harshly. Because to us some of the flatteries of repudiation, 
         whence the pains they are to be nothing but the least, and that very thing. I will explain to you that 
         there are no difficulties in understanding the right distinction of the mind.</p>
      </section>

      <div className="new-container">
        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image" style={{marginRight: '40px'}}>
              <img src="/img1.jpg" alt="Our Story" />
            </div>
            <div className="about-text" >
              <h3 style={{marginLeft: '40px'}}>Our Story</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>SmartFit was founded with the vision of making fitness both accessible and transformative for everyone. 
                  What began as a passion for helping people achieve their health goals has grown into a vibrant community 
                  where cutting-edge fitness techniques and personalized training come together. 
                  We are committed to fostering an inclusive environment where every member feels empowered to become 
                  their best self, whether through strength training, cardio, or yoga. At SmartFit, we're more than just a 
                  fitness center—we're a family dedicated to your growth and well-being.
              </p>
            </div>
          </div>
        </section>

        <section className="about-us-section reverse">
          <div className="about-section-content">
            <div className="about-text">
              <h3 style={{marginRight: '40px'}}>Our Vision</h3>
              <p className="about-text" style={{marginRight: '40px'}}>At SmartFit, our vision is to create a thriving community
                 where fitness is not just a goal but a way of life. 
                 We believe that everyone, regardless of their starting point, 
                 deserves the opportunity to lead a healthier, stronger, and more balanced life. 
                 By integrating cutting-edge training methods with holistic wellness practices, we aim to inspire 
                 and empower individuals to embrace their personal fitness journey. Our goal is to build an inclusive space 
                 where people can connect, grow, and transform together, cultivating both physical strength and mental resilience.</p>
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
              <h3 style={{marginLeft: '40px'}}>Our Mission</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Our mission at SmartFit is to deliver personalized, 
                innovative fitness solutions that cater to individuals of all fitness levels. 
                We are dedicated to combining the best of strength training, cardiovascular health, and yoga to 
                offer a comprehensive approach to well-being. With a focus on creating lasting habits, 
                we strive to support each member in achieving their unique goals—whether it’s improving fitness, 
                increasing mindfulness, or enhancing overall health. At SmartFit, we are committed to providing the tools, 
                guidance, and community necessary for long-term success in both body and mind.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer /> 
    </div>
  );
};

export default AboutUs;
