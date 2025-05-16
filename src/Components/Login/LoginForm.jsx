import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import lock_icon from '../../Utils/images/Sell/login/lock_icon.svg';
import tag_chain_icon from '../../Utils/images/Sell/login/tag_chain_icon.svg';
import input_img from '../../Utils/images/Sell/login/input_bg.svg';
import { authenticateUser, getUser } from '../../API/fetchExpressAPI';
import { setShopToken, setUserToken, setShopTokenValid, setUserTokenValid, setMemberTokenValid, setMemberToken } from '../../store/authSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../CustomSnackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ redirectTo, title, forgotPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
  });

  const [step, setStep] = useState(0); // Step 0: username, Step 1: password
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false); // State to track login success

  const token = useSelector((state) => state.auth.userAccessToken); // Get token from Redux

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));

    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.username && step === 0) {
      newErrors.username = true;
      newErrorMessages.username = 'Username is required';
      valid = false;
    }

    if (!formData.password && step === 1) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (validate()) {
      if (step === 0) {
        setStep(1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBackStep = (e) => {
    if (e) e.preventDefault();
    
      if (step === 1) {
        setStep(0);
      } 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e) e.preventDefault();
      handleNextStep();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (validate()) {
      try {
        const formattedData = {
          ...formData,
          username: formData.username.toLowerCase(),
          type: title.toLowerCase(),
        };

        // Call the API function to authenticate user
        const data = await authenticateUser(formattedData);
        
        if (data.user_access_token) {
          // Dispatch the token to Redux first
          dispatch(setUserToken(data.user_access_token));
          localStorage.setItem('accessToken', data.user_access_token);

          // Store token validity in Redux
          dispatch(setUserTokenValid(true));

          // Set login success flag
          setIsLoginSuccessful(true); // Flag to indicate login success

          setSnackbar({
            open: true,
            message: 'Login Successful',
            severity: 'success',
          });
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: 'error',
        });

        if (!(error.response.data.message === "Incorrect password.")) {
          setStep(0);
        }
      }
    }
  };

  // Effect to handle redirection after token is updated
  useEffect(() => {
    if (isLoginSuccessful && token) {
      setTimeout(() => {
        navigate(redirectTo); // Redirect after setting the token
      }, 2500);
    }
  }, [isLoginSuccessful, token, redirectTo, navigate]);

  return (
    
    <Box component="form" >
      {step === 0 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <IconButton onClick={handleBackStep} className="arrow_icon back">
                <ArrowBackIcon />
              </IconButton>
              <TextField
                hiddenLabel
                variant="outlined"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.username}
                className="input_field"
                placeholder="Enter Username"
              />
              
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.username && <span className="error_message">{errorMessages.username}</span>}
        </Box>
      )}
      {step === 1 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <IconButton onClick={handleBackStep} className="arrow_icon back">
                <ArrowBackIcon />
              </IconButton>
              <TextField
                hiddenLabel
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                autoComplete="current-password"
                error={errors.password}
                className="input_field"
                placeholder="Enter Password"
                InputProps={{ endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment> }}
              />
              
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.password && <span className="error_message">{errorMessages.password}</span>}
        </Box>
      )}

      <Box className="submit_button_container">
        <Link to='../forgot-password' onClick={() => forgotPassword(true)}><Box component="img" src={lock_icon} className="lock_icon" alt="forgot_password" /></Link>
        <Box component="img" src={tag_chain_icon} className="tag_chain_icon" alt="tag_chain_icon" />
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};


export default LoginForm;
