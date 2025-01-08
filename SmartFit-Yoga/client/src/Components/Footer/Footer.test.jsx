import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom/extend-expect';

describe('Footer Component', () => {
  test('renders footer logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders footer sections', () => {
    render(<Footer />);
    const programsSection = screen.getByText('Programs');
    const exploreSection = screen.getByText('Explore');
    const aboutSection = screen.getByText('About');
    const contactSection = screen.getByText('Contact');
    expect(programsSection).toBeInTheDocument();
    expect(exploreSection).toBeInTheDocument();
    expect(aboutSection).toBeInTheDocument();
    expect(contactSection).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer />);
    const phone = screen.getByText('Phone: +123 456 7890');
    const email = screen.getByText('Email: info@example.com');
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);
    const youtubeLink = screen.getByLabelText('YouTube');
    const pinterestLink = screen.getByLabelText('Pinterest');
    const facebookLink = screen.getByLabelText('Facebook');
    const instagramLink = screen.getByLabelText('Instagram');
    const twitterLink = screen.getByLabelText('Twitter');
    expect(youtubeLink).toBeInTheDocument();
    expect(pinterestLink).toBeInTheDocument();
    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  test('renders current year in footer', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(`© ${currentYear} SmartFit & Yoga. All rights reserved.`);
    expect(yearText).toBeInTheDocument();
  });

  test('renders terms of use and privacy policy links', () => {
    render(<Footer />);
    const termsLink = screen.getByLabelText('Terms of Use');
    const privacyLink = screen.getByLabelText('Privacy Policy');
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
  });

  test('renders Google Maps iframe', () => {
    render(<Footer />);
    const iframe = screen.getByTitle('unique-title');
    expect(iframe).toBeInTheDocument();
  });
});