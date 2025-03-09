import React from "react";
import * as Components from './Components';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <Components.Background>
      <Components.Container>
        <Components.Header>
          <Components.Title>SmartFit & Yoga</Components.Title>
          <Components.Subtitle>
          Hệ thống huấn luyện thể dục và yoga cá nhân hóa dựa trên trí tuệ nhân tạo
          </Components.Subtitle>
          <Components.StartButton onClick={() => window.location.href = '/login'}>
          Bắt đầu Dùng Thử Miễn Phí
          </Components.StartButton>
        </Components.Header>
        <Components.Footer>
          <Components.FooterText>Được tin tưởng bởi các yogis và các phòng tập trên toàn thế giới.</Components.FooterText>
        </Components.Footer>
      </Components.Container>
    </Components.Background>
  );
};

export default LandingPage;
