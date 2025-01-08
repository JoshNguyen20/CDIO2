import styled from 'styled-components';

export const Background = styled.div`
position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: url('/bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const StartButton = styled.button`
  border-radius: 15px;
  border: 1px solid #98FF14;
  background-color: #98FF14;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);z=
  }
  &:focus {
    outline: none;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 20px;
`;

export const FooterText = styled.p`
  font-size: 14px;
`;