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
                toast.success("Tài khoản đã được tạo thành công!");
                toggle(true); // Chuyển sang giao diện Sign In sau khi đăng ký thành công
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng ký không thành công. Vui lòng thử lại.");
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
            toast.error("Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.");
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
                        <Components.Title1>TẠO TÀI KHOẢN </Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>hoặc sử dụng Số điện thoại/Email của bạn để đăng ký</Components.Retitle>
                        <Components.Input
                            type='text'
                            placeholder='Tên'
                            name='name'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='email'
                            placeholder='Số điện thoại hoặc Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Mật khẩu'
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Button type="submit">ĐĂNG KÝ </Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>ĐĂNG NHẬP </Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>hoặc sử dụng Số điện thoại/Email và mật khẩu của bạn</Components.Retitle>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Mật khẩu '
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Anchor href='/forgot-password'>Quên mật khẩu ?</Components.Anchor>
                        <Components.Button type="submit">ĐĂNG NHẬP </Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay Panels */}
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title2>Chào mừng bạn trở lại!</Components.Title2>
                            <Components.Paragraph>Nhập thông tin cá nhân của bạn để sử dụng tất cả tính năng của trang web</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>ĐĂNG NHẬP </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title2>Chào bạn!</Components.Title2>
                            <Components.Paragraph>Đăng ký để sử dụng tất cả tính năng của trang web</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>Đăng ký </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
