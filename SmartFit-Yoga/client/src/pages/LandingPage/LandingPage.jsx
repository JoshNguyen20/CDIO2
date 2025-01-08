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
            AI powered personalized fitness and yoga training system
          </Components.Subtitle>
          <Components.StartButton onClick={() => window.location.href = '/login'}>
            Start Free Trial
          </Components.StartButton>
        </Components.Header>
        <Components.Footer>
          <Components.FooterText>Trusted by yogis and studios worldwide.</Components.FooterText>
        </Components.Footer>
      </Components.Container>
    </Components.Background>
  );
};

export default LandingPage;
