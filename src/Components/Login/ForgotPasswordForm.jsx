import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import input_img from '../../Utils/images/Sell/login/input_bg.svg';
import { put_otp, post_verify_otp, put_forgetPassword } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../CustomSnackbar';

const ForgotPasswordForm = ({ redirectTo, title }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ username: '', otp: '', password: '' });
  const [errors, setErrors] = useState({ username: false, otp: false, password: false });
  const [errorMessages, setErrorMessages] = useState({ username: '', otp: '', password: '' });
  const [step, setStep] = useState(0); // Step 0: username, Step 1: OTP, Step 2: password
  const [loading, setLoading ] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
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

    else if (!formData.otp && step === 1) {
      newErrors.otp = true;
      newErrorMessages.otp = 'OTP is required';
      valid = false;
    }

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formData.password && step === 2) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      valid = false;
    }else if (!passwordPattern.test(formData.password) && step=== 2) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 8 characters long and include a special character';
      valid = false;
    }

    if (!formData.confirm_password && step === 3) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Confirm Password is required';
      valid = false;
    }


    else if (formData.password !== formData.confirm_password && step === 3) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match';
      valid = false;
    }
    

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };
  

  const handleNextStep = async (e) => {
    if(e) e.preventDefault();
    if (validate()) {
      if (step === 0) {
        // Send OTP request
        try {
          setLoading(true);
          const resp = await put_otp({
            username: formData.username,
            context: title.toLowerCase(),
          });
          setSnackbar({ open: true, message: resp.message, severity: 'success' });
          setStep(1); // Move to OTP step
        } catch (e) {
          console.log(e);
          
          setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
        }finally{
          setLoading(false);
        }
      } else if (step === 1) {
        // Verify OTP 
        try {
          // Verify OTP 
          setLoading(true);
          const resp = await post_verify_otp({
            username: formData.username,
            otp: formData.otp,
            user_type: title==='Buy'? 'member': 'shop',
          });
          console.log(resp);
          
          setSnackbar({ open: true, message: resp.message, severity: 'success' });
          // If OTP is valid, move to the password step
          setStep(2);
        } catch (e) {
          console.log(e);
          
          setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
          if(e.response.data.message !== 'Invalid OTP.'){
            setStep(0);
          }
        }finally{
          setLoading(false)
        }
      }  else if (step === 2) {
        // Verify OTP (You can send OTP verification request here)
        try {
          // Verify OTP logic here
          // If OTP is valid, move to the password step
          setStep(3);
        } catch (e) {
          setSnackbar({ open: true, message: 'Confirm Password', severity: 'error' });
        }
      }else {
        handleSubmit(); // Submit password after OTP verification
      }
    }else{
      console.log('error')
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
          user_type: title.toLowerCase(),
        };
        const data = await put_forgetPassword(formattedData);
        if (data.user_access_token) {
          localStorage.setItem('accessToken', data.user_access_token);
          setSnackbar({ open: true, message: 'Password Updated', severity: 'success' });
          setTimeout(() => { navigate(redirectTo); }, 2500);
        }
      } catch (error) {
        setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
      }
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      {step === 0 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
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
              <TextField
                hiddenLabel
                variant="outlined"
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.otp}
                className="input_field"
                placeholder="Enter OTP"
              />
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.otp && <span className="error_message">{errorMessages.otp}</span>}
        </Box>
      )}

      {step === 2 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <TextField
                hiddenLabel
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.password}
                className="input_field"
                placeholder="Enter Password"
              />
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.password && <span className="error_message">{errorMessages.password}</span>}
        </Box>
      )}
      {step === 3 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <TextField
                hiddenLabel
                variant="outlined"
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.confirm_password}
                className="input_field"
                placeholder="Confirm Password"
              />
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.confirm_password && <span className="error_message">{errorMessages.confirm_password}</span>}
        </Box>
      )}

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default ForgotPasswordForm;
