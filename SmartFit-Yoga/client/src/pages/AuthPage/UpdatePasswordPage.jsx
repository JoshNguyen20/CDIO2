import React, { useState } from 'react';
import * as Components from './AuthStyles';
import { useNavigate } from "react-router-dom";
import { FiLock } from 'react-icons/fi';

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Updating password:', password, confirmPassword);
    navigate('/login');
  };

  return (
    <Components.Container>
      <Components.FormContainer>
        <Components.Title>Đặt mật khẩu mới</Components.Title>
        <Components.Subtitle>
        Tạo mật khẩu mạnh hơn cho tài khoản của bạn
        </Components.Subtitle>
        <form onSubmit={submitHandler}>
          <Components.ItemContainer>
            <Components.Label htmlFor="password">Mật khẩu mới </Components.Label>
            <div style={{ position: 'relative' }}>
              <Components.Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <FiLock style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
            </div>
          </Components.ItemContainer>
          <Components.ItemContainer>
            <Components.Label htmlFor="confirmPassword">Xác nhận mật khẩu </Components.Label>
            <div style={{ position: 'relative' }}>
              <Components.Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <FiLock style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
            </div>
          </Components.ItemContainer>
          <Components.Button type="submit">Cập nhật </Components.Button>
        </form>
        <Components.Link href="/login">Quay về đăng nhập </Components.Link>
      </Components.FormContainer>
    </Components.Container>
  );
};

export default UpdatePasswordPage;

