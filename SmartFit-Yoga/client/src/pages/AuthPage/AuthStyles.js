import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('/img1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
  }
`;

export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
  color: #e2e8f0;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.5;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4fd1c5;
    box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const Button = styled.button`
  background-color: #4fd1c5;
  color: #1a202c;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #38b2ac;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 209, 197, 0.3);
  }

  &:disabled {
    background-color: #718096;
    cursor: not-allowed;
  }
`;

export const Link = styled.a`
  display: block;
  margin-top: 1.5rem;
  color: #4fd1c5;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #38b2ac;
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: #fc8181;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export const OtpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const OtpInput = styled.input`
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  font-size: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin: 0;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4fd1c5;
    box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.3);
  }
  
  &:disabled {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const Timer = styled.div`
  color: #e2e8f0;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

