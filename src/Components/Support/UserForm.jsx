import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import arrow_icon from '../../Utils/images/Sell/support/arrow_icon.svg';

const UserForm = ({ onValidation }) => {
    // State to store form data and errors
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        otp: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        mobileNumber: false,
        otp: false,
    });

    const [errorMessages, setErrorMessages] = useState({
        name: '',
        mobileNumber: '',
        otp: '',
    });

    const [showOtpField, setShowOtpField] = useState(false);

    // Handle input change for mobile number
    const handleChangeMobileNumber = (e) => {
        const { value } = e.target;

        if (!/^\d{0,10}$/.test(value)) {
            return;
        }

        setFormData({
            ...formData,
            mobileNumber: value,
        });

        setErrors({
            ...errors,
            mobileNumber: false,
        });

        setErrorMessages({
            ...errorMessages,
            mobileNumber: '',
        });
    };

    // Handle input change for OTP
    const handleChangeOtp = (e) => {
        const { value } = e.target;

        if (!/^\d{0,6}$/.test(value)) {
            return;
        }

        setFormData({
            ...formData,
            otp: value,
        });

        setErrors({
            ...errors,
            otp: false,
        });

        setErrorMessages({
            ...errorMessages,
            otp: '',
        });
    };

    // Validate form inputs
    const validate = () => {
        let valid = true;
        const newErrors = {};
        const newErrorMessages = {};

        if (!formData.name) {
            newErrors.name = true;
            newErrorMessages.name = 'Name is required';
            valid = false;
        }

        const mobileNumberPattern = /^\d{10}$/;
        if (!formData.mobileNumber) {
            newErrors.mobileNumber = true;
            newErrorMessages.mobileNumber = 'Mobile Number is required';
            valid = false;
        } else if (!mobileNumberPattern.test(formData.mobileNumber)) {
            newErrors.mobileNumber = true;
            newErrorMessages.mobileNumber = 'Mobile Number must be 10 digits';
            valid = false;
        }

        if (showOtpField && !formData.otp) {
            newErrors.otp = true;
            newErrorMessages.otp = 'OTP is required';
            valid = false;
        } else if (showOtpField && formData.otp.length !== 6) {
            newErrors.otp = true;
            newErrorMessages.otp = 'OTP must be 6 digits';
            valid = false;
        }

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        let valid = true;
        e.preventDefault();
        if (validate()) {
            if (!showOtpField) {
                setShowOtpField(true);
            } else {
                onValidation(valid, formData.name);
                // Place your submission logic here
            }
        }
    };

    // useEffect(() => {
    //     validate(); // Validate on mount and whenever dependencies change
    // }, [formData, showOtpField]);

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box className="form-group">
                <Box>
                    <Box className="field_container">
                        <TextField
                            hiddenLabel
                            placeholder='Enter your name'
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            error={errors.name}
                            className='input_field'
                        />
                    </Box>
                    {errors.name && <span className="error_message">{errorMessages.name}</span>}
                </Box>
                <Box>
                    <Box className="field_container">
                        <TextField
                            hiddenLabel
                            placeholder="Enter your mobile number"
                            variant="outlined"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChangeMobileNumber}
                            required
                            type="tel"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            error={errors.mobileNumber}
                            className='input_field'
                        />
                    </Box>
                    {errors.mobileNumber && <span className="error_message">{errorMessages.mobileNumber}</span>}
                </Box>
                {showOtpField && (
                    <Box>
                        <Box className="field_container">
                            <TextField
                                hiddenLabel
                                placeholder="Enter OTP"
                                variant="outlined"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChangeOtp}
                                required
                                type="tel"
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                error={errors.otp}
                                className='input_field'
                            />
                        </Box>
                        {errors.otp && <span className="error_message">{errorMessages.otp}</span>}
                    </Box>
                )}
            </Box>
            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    <Box component="img" src={arrow_icon} alt='arrow_icon' />
                </Button>
            </Box>
        </Box>
    );
};

export default UserForm;
