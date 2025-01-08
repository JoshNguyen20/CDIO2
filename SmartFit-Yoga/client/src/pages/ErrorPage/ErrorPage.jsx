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
                        Oops! The page you are looking for does not exist.
                    </div>
                    <Link to="/home" className="home-link">Click here to return to home page</Link>
    
                </div>
            {/* </MatrixParallax> */}
        </div>
    );
};

export default ErrorPage;
