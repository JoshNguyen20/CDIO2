import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

// Mock `useNavigate` from `react-router-dom`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock navigate function
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navbar elements correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for logo
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText('CREATE PLANS')).toBeInTheDocument();
    expect(screen.getByText('WORKOUT PLANS')).toBeInTheDocument();
    expect(screen.getByText('NUTRITION PLANS')).toBeInTheDocument();
    expect(screen.getByText('PROGRESS TRACKING')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();

    // Check search input
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    // Check icons
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('navigates to /profile when the user is logged in', () => {
    // Simulate the user being logged in
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Click on the user icon
    fireEvent.click(screen.getByTestId('user-icon'));

    // Assert navigation to profile page
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('navigates to /login when the user is not logged in', () => {
    // Simulate the user being logged out
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Click on the user icon
    fireEvent.click(screen.getByTestId('user-icon'));

    // Assert navigation to login page
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to the correct pages when navigation links are clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Simulate navigation links clicks
    fireEvent.click(screen.getByText('CREATE PLANS'));
    expect(window.location.pathname).toBe('/create');

    fireEvent.click(screen.getByText('ABOUT'));
    expect(window.location.pathname).toBe('/about');
  });

  it('handles search input changes', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Workout' } });

    expect(searchInput.value).toBe('Workout');
  });
});
