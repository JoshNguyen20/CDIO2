import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Components from './LoginPageStyles';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Verimail from '../Verimail';
import * as Yup from 'yup';

const LoginPage = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    // Schema validation với Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email không được để trống')
            .email('Email không đúng định dạng')
            .test('is-gmail', 'Vui lòng sử dụng địa chỉ Gmail', (value) => {
                if (!value) return false;
                // Chuyển đổi email về chữ thường và kiểm tra
                const normalizedEmail = value.toLowerCase();
                return normalizedEmail.endsWith('@gmail.com');
            })
            .test('valid-format', 'Email không được chứa khoảng trắng hoặc ký tự đặc biệt không hợp lệ', (value) => {
                if (!value) return false;
                // Kiểm tra định dạng email chặt chẽ hơn
                const emailRegex = /^[a-zA-Z0-9]+([\._-]?[a-zA-Z0-9]+)*@gmail\.com$/;
                return emailRegex.test(value.toLowerCase());
            }),
    });

    // Validate email với Yup
    const validateEmail = async (email) => {
        try {
            await validationSchema.validateAt('email', { email });
            return ''; // Trả về chuỗi rỗng nếu không có lỗi
        } catch (err) {
            return err.message; // Trả về thông báo lỗi từ Yup
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
        }
    }, []);

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/check-email', { email });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }

        if (name === 'email') {
            // Validate email với Yup
            const emailValidationError = await validateEmail(value);
            if (emailValidationError) {
                setEmailError(emailValidationError);
                return;
            }
            if (!signIn && value) {
                try {
                    const exists = await checkEmailExists(value);
                    if (exists) {
                        setEmailError('Email này đã được sử dụng');
                        Swal.fire({
                            icon: 'error',
                            title: 'Email đã tồn tại',
                            text: 'Vui lòng sử dụng email khác hoặc đăng nhập nếu đã có tài khoản!',
                        });
                    } else {
                        setEmailError('');
                    }
                } catch (error) {
                    console.error('Error checking email:', error);
                }
            }
        }
    };

    const validatePasswords = () => {
        const { password, confirmPassword } = formData;
        
        if (password !== confirmPassword) {
            setPasswordError('Mật khẩu nhập lại không khớp');
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Mật khẩu nhập lại không khớp!',
            });
            return false;
        }
        
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        const emailValidationError = await validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            Swal.fire({
                icon: 'error',
                title: 'Email không hợp lệ',
                text: emailValidationError,
            });
            return;
        }
        
        if (emailError) {
            Swal.fire({
                icon: 'error',
                title: 'Không thể đăng ký',
                text: 'Email đã tồn tại, vui lòng sử dụng email khác!',
            });
            return;
        }
        
        if (!validatePasswords()) {
            return;
        }

        try {
            const verificationResponse = await axios.post('http://localhost:5000/api/auth/send-verification', { email });

            if (verificationResponse.status === 200) {
                toast.success("Mã xác thực đã được gửi đến email của bạn!");
                localStorage.setItem('registerData', JSON.stringify({ name, email, password }));
                console.log("Đã gửi mã xác thực! Điều hướng đến /verimail");
                navigate('/verimail');
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Không thể gửi mã xác thực. Vui lòng thử lại.");
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
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        } catch (error) {
            toast.error("Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn ? handleSignIn(e) : handleSignUp(e);
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
                        <Components.Input type='text' placeholder='Tên' name='name' onChange={handleInputChange} />
                        <Components.Input 
                            type='email' 
                            placeholder='Nhập Gmail của bạn' 
                            name='email' 
                            onChange={handleInputChange}
                        />
                        {emailError && <p style={{ color: 'red', fontSize: '0.8rem', margin: '-5px 0 10px' }}>{emailError}</p>}
                        <Components.Input type='password' placeholder='Mật khẩu' name='password' onChange={handleInputChange} />
                        <Components.Input 
                            type='password' 
                            placeholder='Nhập lại mật khẩu' 
                            name='confirmPassword' 
                            onChange={handleInputChange}
                        />
                        {passwordError && <p style={{ color: 'red', fontSize: '0.8rem', margin: '-5px 0 10px' }}>{passwordError}</p>}
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
                        <Components.Input type='email' placeholder='Email' name='email' onChange={handleInputChange} />
                        <Components.Input type='password' placeholder='Mật khẩu ' name='password' onChange={handleInputChange} />
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
                            <Components.GhostButton onClick={() => toggle(true)}>ĐĂNG NHẬP</Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title2>Chào bạn!</Components.Title2>
                            <Components.Paragraph>Đăng ký để sử dụng tất cả tính năng của trang web</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Đăng ký
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
