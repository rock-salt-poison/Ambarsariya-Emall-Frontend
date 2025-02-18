import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Link, useLocation } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';

function LoginPageCard({title, imgSrc, backButton, redirectTo}) {
    const location = useLocation();
    const [forgotPassword, setForgotPassword] = useState(false);
    
    const pathname = location.pathname;

    // Effect hook to detect when the forgot-password route is active
    useEffect(() => {
        if (pathname.includes('forgot-password')) {
            setForgotPassword(true);
        } else {
            setForgotPassword(false);
        }
    }, [pathname]);

    return (
        <Box className="card">
            {backButton}
            <Typography variant='h2' className='title'> 
                {title}
            </Typography>
            <Box className="form_container">
                <Link onClick={() => console.log('Icon clicked')}>
                    <Box component="img" src={imgSrc} className="icon" alt="icon" />
                </Link>
                {forgotPassword && <Typography className="heading">Forgot Password</Typography>}
                {/* Conditional rendering based on forgotPassword state */}
                {!forgotPassword ? (
                    <LoginForm 
                        redirectTo={redirectTo} 
                        title={title} 
                        forgotPassword={(data) => setForgotPassword(data)} 
                    />
                ) : (
                    <ForgotPasswordForm redirectTo={'../login'} title={title} />
                )}
            </Box>
        </Box>
    );
}

export default LoginPageCard;
