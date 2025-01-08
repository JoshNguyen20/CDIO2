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
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 800px; 
  max-width: 100%;
  min-height: 500px; 
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: rgba(217, 217, 217, 0.5); /* Đặt độ trong suốt của màu là 50% */
  border: 5px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 10px;
`;

export const Button = styled.button`
  border-radius: 15px;
  border: 1px solid #98FF14;
  background-color: #98FF14;
  color: #000000;
  font-size: 12px;
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

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #000000; /* Đổi màu viền thành đen */
  color: #000000; /* Màu chữ đen */
  margin: -10px 0;
`;

export const Retitle = styled.a`
  color: #C0C0C0;
  font-size: 12px;
  text-decoration: none;
  margin: 5px 0;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 13px;
  text-decoration: underline;
  margin: 15px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }

  &:active {
    color: #777;
  }
`;


export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #98FF14;
  background: -webkit-linear-gradient(to right, #FFFFFF, #FFFFFF);
  background: linear-gradient(to right, #FFFFFF, #FFFFFF);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #000000;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%; /* Giữ width lớn để phần bo tròn lộ ra ngoài */
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;


export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  left: 0;
  transform: translateX(-20%); /* Vị trí ban đầu để trượt vào */
  background-color: #98FF14;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transition: transform 0.6s ease-in-out; /* Chuyển động mượt */
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0%); /* Vị trí ban đầu để trượt vào */
  background-color: #98FF14;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  transition: transform 0.6s ease-in-out; /* Chuyển động mượt */
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;


export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 10px;
`;

// Mỗi nút mạng xã hội
export const SocialButton = styled.button`
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ddd;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;