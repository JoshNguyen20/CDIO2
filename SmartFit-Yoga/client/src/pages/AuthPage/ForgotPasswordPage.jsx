import React, { useState } from 'react';
import * as Components from './AuthStyles';
import { useNavigate } from "react-router-dom";
import { FiMail } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Sending OTP to:', email);
    navigate('/forgot-password/verify-otp');
  };

  return (
    <Components.Container>
      <Components.FormContainer>
        <Components.Title>Forgot Password?</Components.Title>
        <Components.Subtitle>
          Enter your email and we will send a 6-digit code to reset your password.
        </Components.Subtitle>
        <form onSubmit={submitHandler}>
          <Components.ItemContainer>
            <Components.Label htmlFor="email">Email Address</Components.Label>
            <div style={{ position: 'relative' }}>
              <Components.Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
              <FiMail style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
            </div>
          </Components.ItemContainer>
          <Components.Button type="submit">Send Reset Link</Components.Button>
        </form>
        <Components.Link href="/login">Back to Login</Components.Link>
      </Components.FormContainer>
    </Components.Container>
  );
};

export default ForgotPasswordPage;
