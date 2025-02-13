import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormField from './FormField'; 
import { useNavigate } from 'react-router-dom';
import { getMemberData, getUser, postMemberData } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../CustomSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberToken, setMemberTokenValid, setUserToken, setUserTokenValid } from '../../store/authSlice';

const UserPortfolioForm = () => {
  const initialFormData = {
    name: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    address: '',
    username: '',
    password: '',
    confirm_password: '',
    displayPicture: null,
    backgroundPicture: null,
  };

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedDisplayFileName, setSelectedDisplayFileName] = useState(''); 
  const [selectedBackgroundFileName, setSelectedBackgroundFileName] = useState('');
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const token = useSelector((state) => state.auth.userAccessToken);

  const fetchMemberData = async (memberToken) => {
      const user = await getMemberData(memberToken);
      if(user){
        console.log(user)
        setFormData({
          ...formData,
          name: user[0].full_name,
          phoneNumber: user[0].phone_no_1,
          gender: user[0].gender,
          dob: new Date(user[0].dob).toLocaleDateString('en-CA'),
          address: user[0].address,
          username: user[0].username
        })
      }
  }

  useEffect(()=>{
    const fetchData = async () => {
      if(token){
        const user = (await getUser(token))[0];
        if(user.user_type === "member"){
          fetchMemberData(user.user_access_token);
        }
      }
    }
    fetchData();
  }, [token])


  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'phoneNumber' && !/^\d{0,10}$/.test(value)) {
    //   return; // Only allow up to 10 digits
    // }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;
    
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      if (fieldName === 'displayPicture') {
        setSelectedDisplayFileName(file.name);
      } else if (fieldName === 'backgroundPicture') {
        setSelectedBackgroundFileName(file.name);
      }
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};
    const requiredFields = ['name', 'phoneNumber', 'gender', 'dob', 'address', 'username', 'password', 'confirm_password'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        valid = false;
      }
    });

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 8 characters long and include a special character';
      valid = false;
    }

    const phonePattern = /^\+91\s\d{5}-\d{5}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = true;
      newErrorMessages.phoneNumber = 'Phone No. must be +91 followed by 10 digits';
      valid = false;
    }

    // if (!/^\d+$/.test(formData.age)) {
    //   newErrors.age = true;
    //   newErrorMessages.age = 'Age must be a number.';
    //   valid = false;
    // }

    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      try{
        const userData = {
          name:formData.name,
          username:(formData.username).toLowerCase(),
          password:formData.password,
          address:formData.address,
          phone:formData.phoneNumber,
          gender:formData.gender,
          dob:formData.dob
        }
  
        const response = await postMemberData(userData);
        if(response){

          dispatch(setUserToken(response.user_access_token));
        
        localStorage.setItem('accessToken', response.user_access_token);

        // Store token validity in Redux
        dispatch(setUserTokenValid(true));

          setSnackbar({
            open: true,
            message: response.message,
            severity: 'success',
          });
        }
        setTimeout(()=>{navigate('../esale')}, 2500);
      }catch(error){
        if (error.response.data.error === 'duplicate key value violates unique constraint "users_phone_no_1_key"') {
          setSnackbar({
            open: true,
            message: 'The phone number you entered already exists. Please use a different phone number.',
            severity: 'error',
          });
        }else if (error.response.data.error.includes('Username') &&  error.response.data.error.includes('already exists')) {
          setSnackbar({
            open: true,
            message: 'Username already exists.',
            severity: 'error',
          });
        }else{
          setSnackbar({
            open: true,
            message: 'Error while submitting the form. Please try again.',
            severity: 'error',
          });
        }
      }
       // Navigate to the appropriate page
    }
  };

  const genderOptions = ['Male', 'Female'];

  const renderFormField = (name, type, options = [], placeholder = '') => (
    <FormField
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      error={!!errors[name]}
      errorMessage={errorMessages[name]}
      options={options}
      placeholder={placeholder}
    />
  );

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        <Box className="form-group-2">
          {renderFormField('name', 'text', [], 'Enter your name')}
          {renderFormField('phoneNumber', 'phone_number', [], 'Enter your phone number')}
        </Box>

        <Box className="form-group-2">
          {renderFormField('gender', 'select', genderOptions, 'Select gender')}
          {renderFormField('dob', 'date', [], 'Enter your dob')}
        </Box>
        
        {renderFormField('address', 'address', [], 'Enter your address')}
        {renderFormField('username', 'text', [], 'Enter your username')}
        <Box className="form-group-2">
          {renderFormField('password', 'password', [], 'Enter your password')}
          {renderFormField('confirm_password', 'password', [], 'Confirm password')}
        </Box>

        {/* File upload inputs */}
        <Box className="form-group">
          <input
            type="file"
            name="displayPicture"
            id="display-picture-upload"
            accept="image/*" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button variant="contained" component="label" htmlFor="display-picture-upload">
            Upload Display Picture
          </Button>
          {selectedDisplayFileName && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Display Picture: {selectedDisplayFileName}
            </Typography>
          )}
        </Box>

        <Box className="form-group">
          <input
            type="file"
            name="backgroundPicture"
            id="background-picture-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button variant="contained" component="label" htmlFor="background-picture-upload">
            Upload Background Picture
          </Button>
          {selectedBackgroundFileName && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Background Picture: {selectedBackgroundFileName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
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

export default UserPortfolioForm;
