import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  color: #e2e8f0;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

const ResendLink = styled.button`
  background: none;
  border: none;
  color: #4fd1c5;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #38b2ac;
  }

  &:disabled {
    color: #718096;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResend = () => {
    console.log('Đang GỬi Lại Mẫ OTP...');
    setTimeLeft(60);
  };

  return (
    <TimerContainer>
      {timeLeft > 0 ? (
        <>Gửi Lại Mã OTPOTP {timeLeft}s</>
      ) : (
        <ResendLink onClick={handleResend}>Gửi Lại Mã OTP</ResendLink>
      )}
    </TimerContainer>
  );
};

export default Timer;

