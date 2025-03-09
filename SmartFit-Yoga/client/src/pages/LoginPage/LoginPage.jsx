import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Components from './LoginPageStyles';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password, } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            if (response.status === 201) {
                toast.success("Account created successfully!");
                toggle(true); // Switch to Sign In interface after successful registration
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success("Login successful!");
            if (user.role === 'Admin') {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                navigate('/home'); // Redirect to home page
            }
        } catch (error) {
            toast.error("Login failed. Please check your login information.");
        }
    };

    const handleSubmit = (e) => {
        if (signIn) {
            handleSignIn(e);
        } else {
            handleSignUp(e);
        }
    };

    return (
        
        <Components.Background>
            <Components.Container>
                {/* Sign Up Container */}
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>CREATE ACCOUNT</Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your phone number/Email to register</Components.Retitle>
                        <Components.Input
                            type='text'
                            placeholder='Name'
                            name='name'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='email'
                            placeholder='Phone number or Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Button type="submit">SIGN UP</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>SIGN IN</Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your phone number/Email and password</Components.Retitle>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Anchor href='/forgot-password'>Forgot password?</Components.Anchor>
                        <Components.Button type="submit">SIGN IN</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay Panels */}
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title2>Welcome back!</Components.Title2>
                            <Components.Paragraph>Enter your personal details to use all the features of the website</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>SIGN IN</Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title2>Hello!</Components.Title2>
                            <Components.Paragraph>Register to use all the features of the website</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
