import React from 'react';
import './AboutPage.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const OurTeam = () => {
  return (
    <div>
      <Navbar />
      <section className="ourteam-header" >
        <h2>OUR TEAM</h2>
        <p className="header__content">C1SE.40 DUY TAN UNIVERSITY</p>
      </section>

      <div className="new-container">
        <section className="about-us-section">
          <div className="about-section-content">
            <div className="ourteam-image" style={{marginRight: '40px'}}>
              <img src="https://files01.duytan.edu.vn/svruploads/scs-duytan/upload/images/15-1-2021-7-58-1-19.png" alt="mentor" />
            </div>
            <div className="about-text" >
              <h3 style={{marginLeft: '40px'}}>Mentor</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>
                Long, Le Thanh, Ph.D 
              </p>
              <p className="about-text" style={{marginLeft: '40px'}}>
              Head of Department (Department of Computer Science)
              </p>
            </div>
          </div>
        </section>

        <section className="about-us-section reverse">
          <div className="about-section-content">
            <div className="about-text">
              <h3 style={{marginRight: '40px'}}>Scrum Master</h3>
              <p className="about-text" style={{marginRight: '40px'}}>
                Hai, Nguyen Xuan
              </p>
              <p className="about-text" style={{marginRight: '40px'}}>
              A guy from Nghe An province, currently a 4th year student at Duy Tan University, majoring in CMU standard software technology. Specialized in FE programming with a little bit of BE and python, java
              </p>
            </div>
            <div className="ourteam-image" style={{marginLeft: '40px'}}>
              <img src="/hai.jpg" alt="Our Vision" />
            </div>
          </div>
        </section>

        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image" style={{marginRight: '40px'}}>
              <img src="/img3.jpg" alt="Our Mission" />
            </div>
            <div className="about-text">
              <h3 style={{marginLeft: '40px'}}>Product Owner</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Bao, Nguyen Huu Gia</p>
              <p className="about-text" style={{marginLeft: '40px'}}>A guy from Da Nang City, currently a 4th year student at Duy Tan University, majoring in CMU standard software technology. Specialized in FE programming with a little bit of BE</p>
            </div>
          </div>
        </section>

        <section className="about-us-section reverse">
          <div className="about-section-content">
            <div className="about-text">
              <h3 style={{marginRight: '40px'}}>Team Member</h3>
              <p className="about-text" style={{marginRight: '40px'}}>
                Bach, Tran Duy
              </p>
              <p className="about-text" style={{marginRight: '40px'}}>
              A guy from Da Nang City, currently a 4th year student at Duy Tan University, majoring in CMU standard software technology. Specialized in FE programming with a little bit of BE and python
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
              <h3 style={{marginLeft: '40px'}}>Team Member</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Mai, Tran Thi Ngoc</p>
              <p className="about-text" style={{marginLeft: '40px'}}>A guy from Ha Tinh province, currently a 4th year student at Duy Tan University, majoring in CMU standard software technology. Specialized in Design Interface FE and a little bit programing FE</p>
            </div>
          </div>
        </section>
      </div>
      <Footer /> 
    </div>
  );
};

export default OurTeam;
