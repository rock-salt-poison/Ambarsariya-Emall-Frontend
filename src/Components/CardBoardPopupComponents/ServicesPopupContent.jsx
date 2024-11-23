import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import digilocker_icon from '../../Utils/images/social_links/digi_locker.webp';
import FormField from '../Form/FormField';

function ServicesPopupContent() {
    // Centralized form data and validation
    const [formData, setFormData] = useState({
        digilockerId: '',
        otp: '',
        aadhar_card: false,
        driving_license: false,
        pan_card: false,
        fast_tag: false,
        professional_qualification: false,
        registration_assets: false,
    });
    const [errors, setErrors] = useState({
        digilockerId: false,
        otp: false,
    });
    const [showOtpField, setShowOtpField] = useState(false);

    // Error messages for fields
    const errorMessages = {
        digilockerId: 'DigiLocker ID is required',
        otp: 'OTP is required',
    };

    // Generic onChange handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Validate form fields dynamically
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.digilockerId) {
            newErrors.digilockerId = true;
            isValid = false;
        }

        if (showOtpField && !formData.otp) {
            newErrors.otp = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('DigiLocker ID:', formData);
            if (!showOtpField) {
                setShowOtpField(true); 
            } else {
                console.log(formData, formData);
            }
        }
    };

    // Function to render a single form field
    const renderFormField = (name, type, placeholder = '', label = '', additionalProps = {}) => (
        <FormField
            key={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            error={!!errors[name]}
            errorMessage={errorMessages[name]}
            placeholder={placeholder}
            label={type === 'checkbox' ? label : undefined} // Only add label for checkbox
            {...additionalProps}
        />
    );

    return (
        <Box component="form" noValidate autoComplete="off" className="services_popup_form" onSubmit={handleSubmit}>
            <Box className="form-group">
                <Box component="img" src={digilocker_icon} alt="DigiLocker Icon" className="icon" />
                <Box className="form-fields">
                    {/* Render DigiLocker ID field */}
                    {renderFormField('digilockerId', 'text', 'Enter DigiLocker ID')}

                    {/* Conditionally render OTP field */}
                    {showOtpField && renderFormField('otp', 'text', 'Enter OTP')}
                </Box>
            </Box>
            <label className='label'>Choose the Documents You Want to Retrieve from DigiLocker</label>
            <Box className="checkbox-group">
                {/* Render checkboxes with unique names and labels */}
                {renderFormField('aadhar_card', 'checkbox', '', 'Aadhar Card')}
                {renderFormField('driving_license', 'checkbox', '', 'Driving License')}
                {renderFormField('pan_card', 'checkbox', '', 'Pan Card')}
                {renderFormField('fast_tag', 'checkbox', '', 'Fast Tag')}
                {renderFormField('professional_qualification', 'checkbox', '', 'Professional Qualification')}
                {renderFormField('registration_assets', 'checkbox', '', 'Registration of Assets and etc.')}
            </Box>
            {/* Submit button */}
            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default ServicesPopupContent;