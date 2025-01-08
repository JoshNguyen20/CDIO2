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
                toggle(true); // Chuyển sang giao diện Sign In sau khi đăng ký thành công
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to register. Please try again.");
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
                navigate('/admin-dashboard'); // Chuyển hướng đến trang quản trị
            } else {
                navigate('/home'); // Chuyển hướng đến trang chính
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
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
                        <Components.Title1>Create Account</Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email for registration</Components.Retitle>
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
                        <Components.Button type="submit">Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>Sign In</Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email and password</Components.Retitle>
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
                        <Components.Anchor href='/forgot-password'>Forgot your password?</Components.Anchor>
                        <Components.Button type="submit">Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay Panels */}
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title2>Welcome Back!</Components.Title2>
                            <Components.Paragraph>Enter your personal details to use all site features</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title2>Hello, Friend!</Components.Title2>
                            <Components.Paragraph>Register to use all site features</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
