import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormField from './FormField'; 
import { useNavigate } from 'react-router-dom';

const UserPortfolioForm = () => {
  const initialFormData = {
    name: '',
    phoneNumber: '',
    gender: '',
    age: '',
    address: '',
    username: '',
    password: '',
    confirm_password: '',
    displayPicture: null,
    backgroundPicture: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedDisplayFileName, setSelectedDisplayFileName] = useState(''); 
  const [selectedBackgroundFileName, setSelectedBackgroundFileName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber' && !/^\d{0,10}$/.test(value)) {
      return; // Only allow up to 10 digits
    }

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
    const requiredFields = ['name', 'phoneNumber', 'gender', 'age', 'address', 'username', 'password', 'confirm_password'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        valid = false;
      }
    });

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = true;
      newErrorMessages.phoneNumber = 'Phone number must be 10 digits.';
      valid = false;
    }

    if (!/^\d+$/.test(formData.age)) {
      newErrors.age = true;
      newErrorMessages.age = 'Age must be a number.';
      valid = false;
    }

    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      console.log('Uploaded Display Picture:', formData.displayPicture);
      console.log('Uploaded Background Picture:', formData.backgroundPicture);

      navigate('../esale'); // Navigate to the appropriate page
    }
  };

  const genderOptions = ['Male', 'Female', 'Other'];

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
          {renderFormField('phoneNumber', 'tel', [], 'Enter your phone number', { maxLength: 10 })}
        </Box>

        <Box className="form-group-2">
          {renderFormField('gender', 'select', genderOptions, 'Select gender')}
          {renderFormField('age', 'number', [], 'Enter your age')}
        </Box>
        
        {renderFormField('address', 'text', [], 'Enter your address')}
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
    </Box>
  );
};

export default UserPortfolioForm;
