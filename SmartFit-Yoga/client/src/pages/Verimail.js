import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Verimail.css'; // Tạo file CSS riêng

const Verimail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
        setInvalidFields((prev) =>
            prev.filter((field) => field.name !== 'verificationCode')
        );
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        console.log("📩 Sending verification code:", verificationCode);
        
        const registerData = JSON.parse(localStorage.getItem('registerData'));
        
        if (!registerData || !registerData.email) {
            Swal.fire('Error!', 'Registration information not found', 'error');
            return;
        }
    
        try {
            setIsLoading(true);
            
            const verifyResponse = await axios.post(
                `http://localhost:5000/api/auth/verify-email/${verificationCode}`,
                { email: registerData.email }
            );
    
            console.log("✅ Verify API Response:", verifyResponse.data);
    
            if (verifyResponse.data.success) {
                try {
                    const registerResponse = await axios.post(
                        `http://localhost:5000/api/auth/register/${verificationCode}`,
                        registerData
                    );
                    
                    console.log("Register API Response:", registerResponse.data);
                    
                    Swal.fire('Registration Successful!', 'Your account has been created', 'success').then(() => {
                        localStorage.removeItem('registerData');
                        console.log("🚀 Navigating to login...");
                        navigate('/login');
                    });
                } catch (registerError) {
                    console.error("Register API Error:", registerError);
                    Swal.fire(
                        'Registration Error!', 
                        registerError.response?.data?.msg || 'Unable to complete registration', 
                        'error'
                    );
                }
            } else {
                Swal.fire('Error!', verifyResponse.data.msg || 'Invalid verification code', 'error');
            }
        } catch (error) {
            console.error("Verify API Error:", error);
            Swal.fire(
                'Verification Error!', 
                error.response?.data?.msg || 'An error occurred while verifying the code', 
                'error'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        const registerData = JSON.parse(localStorage.getItem('registerData'));
        
        if (!registerData || !registerData.email) {
            Swal.fire('Error!', 'Registration information not found', 'error');
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/send-verification',
                { email: registerData.email }
            );
            
            if (response.status === 200) {
                Swal.fire(
                    'Success',
                    'A new verification code has been sent to your email',
                    'success'
                );
                setCountdown(60);
                setCanResend(false);
            } else {
                Swal.fire('Error!', response.data.msg || 'Error sending new verification code!', 'error');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'An error occurred while resending the code';
            Swal.fire('Oops!', errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="verimail-container">
            <motion.div
                className="verimail-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="verimail-title">Email Verification</h1>
                <form className="verimail-form" onSubmit={handleVerify}>
                    <div className="input-wrapper">
                        <FiMail className="mail-icon" />
                        <input
                            type="text"
                            className={`verimail-input ${invalidFields.some(field => field.name === 'verificationCode') ? 'error' : ''}`}
                            placeholder="Enter verification code"
                            value={verificationCode}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`verimail-button ${isLoading ? 'disabled' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                <p className="verimail-timer">
                    Verification code is valid for {countdown} seconds
                </p>

                <button
                    type="button"
                    className={`resend-button ${!canResend || isLoading ? 'disabled' : ''}`}
                    onClick={handleResendCode}
                    disabled={!canResend || isLoading}
                >
                    {isLoading ? 'Sending...' : 'Resend Code'}
                </button>

                <span className="back-link" onClick={() => navigate('/register')}>
                    Go back to previous step
                </span>
            </motion.div>

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

export default Verimail;
