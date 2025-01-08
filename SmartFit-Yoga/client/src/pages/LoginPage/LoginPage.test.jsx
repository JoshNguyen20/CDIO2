import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

jest.mock('axios');
jest.mock('react-hot-toast', () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe('LoginPage Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders sign in form by default', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    test('toggles to sign up form', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );
        fireEvent.click(screen.getByText('Sign Up'));
        expect(screen.getByText('Create Account')).toBeInTheDocument();
    });

    test('handles sign in form submission', async () => {
        axios.post.mockResolvedValue({
            data: { token: 'fakeToken', user: { name: 'John Doe' } },
        });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign In'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password',
        });

        await screen.findByText('Login successful!');
        expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });

    test('handles sign up form submission', async () => {
        axios.post.mockResolvedValue({
            data: { token: 'fakeToken', user: { name: 'John Doe' } },
        });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.click(screen.getByText('Sign Up'));
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Phone number or Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign Up'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/auth/register', {
            name: 'John Doe',
            email: 'test@example.com',
            password: 'password',
        });

        await screen.findByText('Account created successfully!');
        expect(toast.success).toHaveBeenCalledWith('Account created successfully!');
    });

    test('displays error message on sign in failure', async () => {
        axios.post.mockRejectedValue({
            response: { data: { message: 'Login failed. Please check your credentials.' } },
        });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText('Sign In'));

        await screen.findByText('Login failed. Please check your credentials.');
        expect(toast.error).toHaveBeenCalledWith('Login failed. Please check your credentials.');
    });

    test('displays error message on sign up failure', async () => {
        axios.post.mockRejectedValue({
            response: { data: { message: 'Failed to register. Please try again.' } },
        });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.click(screen.getByText('Sign Up'));
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Phone number or Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign Up'));

        await screen.findByText('Failed to register. Please try again.');
        expect(toast.error).toHaveBeenCalledWith('Failed to register. Please try again.');
    });
});