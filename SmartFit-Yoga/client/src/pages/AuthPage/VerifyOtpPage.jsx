import React, { useState, useEffect, useRef } from 'react';
import * as Components from './AuthStyles';
import { useNavigate } from "react-router-dom";
import Timer from './Timer';

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    navigate('/forgot-password/verify-otp/update-password');
  };

  return (
    <Components.Container>
      <Components.FormContainer>
        <Components.Title>Verify OTP</Components.Title>
        <Components.Subtitle>
          Enter the 6-digit code sent to your email
        </Components.Subtitle>
        <form onSubmit={submitHandler}>
          <Components.OtpContainer>
            {otp.map((data, index) => {
              return (
                <Components.OtpInput
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </Components.OtpContainer>
          <Components.Button type="submit">Verify OTP</Components.Button>
        </form>
        <Components.Timer>
          <Timer />
        </Components.Timer>
        <Components.Link href="/forgot-password">Back</Components.Link>
      </Components.FormContainer>
    </Components.Container>
  );
};

export default VerifyOtpPage;

