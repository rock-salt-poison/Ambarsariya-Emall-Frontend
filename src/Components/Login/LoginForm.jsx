import React, { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import lock_icon from '../../Utils/images/Sell/login/lock_icon.svg';
import tag_chain_icon from '../../Utils/images/Sell/login/tag_chain_icon.svg';
import input_img from '../../Utils/images/Sell/login/input_bg.svg';
import { authenticateUser, getUser } from '../../API/fetchExpressAPI';
import { setShopToken, setUserToken, setShopTokenValid, setUserTokenValid, setMemberTokenValid, setMemberToken } from '../../store/authSlice'; 
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../CustomSnackbar';

const LoginForm = ({redirectTo}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
        };
        // Call the API function to authenticate user
        const data = await authenticateUser(formattedData);
        
        if(data.user_access_token){
          const user = await getUser(data.user_access_token);
          const userType = user.map((user)=>user);
          if(userType[0].user_type==='member'){
            dispatch(setMemberToken(data.user_access_token));
        
            localStorage.setItem('memberAccessToken', data.user_access_token);

            // Store token validity in Redux
            dispatch(setMemberTokenValid(true));
          }else if(userType[0].user_type==='shop' ){
            dispatch(setUserToken(data.user_access_token));
            dispatch(setShopToken(userType[0].shop_access_token));
            
            localStorage.setItem('userAccessToken', data.user_access_token);

            localStorage.setItem('shopAccessToken', userType[0].shop_access_token);
            // Store token validity in Redux
            dispatch(setUserTokenValid(true));
          }
        }

        // If login is successful, dispatch the user access token to Redux

        // Redirect based on the user type
        // if (data.user_type === 'member') {
        //   navigate(redirectTo);
        // } else if (data.user_type === 'merchant') {
        //   navigate(redirectTo);
        // } else {
        //   alert('Unknown user type.');
        // }
        setSnackbar({
          open: true,
          message: 'Login Successful',
          severity: 'success',
        });
        setTimeout(()=>{navigate(redirectTo)},2500);
        
      } catch (error) {
        console.error('Error logging in:', error.response.data.message);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: 'error',
        });
        if(!(error.response.data.message === "Incorrect Password.")){
          setStep(0);
        }
      }
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
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

      <Box className="submit_button_container">
        <Box component="img" src={lock_icon} className="lock_icon" alt="forgot_password" />
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
