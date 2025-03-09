import React from 'react';
import { Link } from 'react-router-dom';
// import MatrixParallax from 'react-matrix-parallax';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div>
            <div style={{ height: '120px' }}></div>
            {/* <MatrixParallax> */}
                <div className="error-container">
                    <div className="error-code">404</div>
                    <div className="error-message">
                    Ôi! Trang bạn đang tìm kiếm không tồn tại.
                    </div>
                    <Link to="/home" className="home-link">Nhấp vào đây để trở lại trang chủ</Link>
    
                </div>
            {/* </MatrixParallax> */}
        </div>
    );
};

export default ErrorPage;
