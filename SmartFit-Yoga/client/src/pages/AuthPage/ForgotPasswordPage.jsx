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
        <Components.Title>Quên Mật KhẩuKhẩu?</Components.Title>
        <Components.Subtitle>
        Nhập email của bạn và chúng tôi sẽ gửi mã gồm 6 chữ số để bạn đặt lại mật khẩu.
        </Components.Subtitle>
        <form onSubmit={submitHandler}>
          <Components.ItemContainer>
            <Components.Label htmlFor="email">Địa Chỉ Email </Components.Label>
            <div style={{ position: 'relative' }}>
              <Components.Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập Email của Bạn "
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
          <Components.Button type="submit">Gửi liên kết đặt lại mật khẩu</Components.Button>
        </form>
        <Components.Link href="/login">Quay Về Đăng Nhập </Components.Link>
      </Components.FormContainer>
    </Components.Container>
  );
};

export default ForgotPasswordPage;
