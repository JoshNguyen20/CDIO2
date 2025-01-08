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
        <Components.Title>Set New Password</Components.Title>
        <Components.Subtitle>
          Create a strong password for your account
        </Components.Subtitle>
        <form onSubmit={submitHandler}>
          <Components.ItemContainer>
            <Components.Label htmlFor="password">New Password</Components.Label>
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
            <Components.Label htmlFor="confirmPassword">Confirm Password</Components.Label>
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
          <Components.Button type="submit">Update Password</Components.Button>
        </form>
        <Components.Link href="/login">Back to Login</Components.Link>
      </Components.FormContainer>
    </Components.Container>
  );
};

export default UpdatePasswordPage;

