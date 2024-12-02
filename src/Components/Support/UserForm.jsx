import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import arrow_icon from "../../Utils/images/Sell/support/arrow_icon.svg";
import { get_memberData, get_visitorData, getMemberData, post_support_name_password } from "../../API/fetchExpressAPI";
import FormField from "../Form/FormField";
import CustomSnackbar from "../CustomSnackbar";
import { setVisitorToken } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UserForm = ({ onValidation, visitorData }) => {
  // State to store form data and errors

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone_no: false,
    otp: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    phone_no: "",
    otp: "",
  });

  const [showOtpField, setShowOtpField] = useState(false);
  const validOtp = "123456";
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);
  const token = visitorData ? visitorData.access_token : '';
  
  useEffect(()=>{
    const fetchVisitorData = async () => {
        if(visitorData){
              setFormData({
                ...formData,
                name:visitorData.name || '',
                phone_no: visitorData.phone_no || '',
              })
        }
    }
    fetchVisitorData()
  }, [visitorData]);

  // Handle input change
  const handleChange = (e) => {
    if (!e.target) return;
    const { name, value } = e.target;

    if (name === "otp" && !/^\d{0,6}$/.test(value)) {
      return;
    }

    // Update the form data for the changed field
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the field based on the name
    });

    // Reset the specific error and error message for the changed field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: "" }));
  };

  // Validate form inputs
  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = true;
      newErrorMessages.name = "Name is required";
      valid = false;
    }

    // Phone number validation
    const mobilePattern = /^\+91\s\d{5}-\d{5}$/;
    if (!mobilePattern.test(formData.phone_no)) {
      newErrors.phone_no = true;
      newErrorMessages.phone_no = "Phone No. must be +91 followed by 10 digits";
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const validateOtp = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (formData.phone_no) {
      if (formData.otp !== validOtp) {
        newErrors.otp = true;
        newErrorMessages.otp = "Invalid OTP";
        valid = false;
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showOtpField) {
      // Validate initial form fields
      if (validate()) {
        // Show OTP fields if initial validation is successful
        setShowOtpField(true);
      }
    } else {
      // Validate OTP fields
      if (validateOtp()) {
        if (validate()) {
          try {
            setLoading(true);
            const resp = await post_support_name_password(formData);
            console.log(resp);
            setLoading(false);
            
            if(resp){
              dispatch(setVisitorToken(resp.newAccessToken));
              
              localStorage.setItem('visitorAccessToken', resp.newAccessToken);
              
              onValidation(true, resp.newAccessToken);
              setSnackbar({ open: true, message: resp.message, severity: 'success' });
            }

        } catch (error) {
            if(error.response.data.error === 'duplicate key value violates unique constraint "support_phone_no_key"'){
                setSnackbar({ open: true, message: 'Phone number already exists.', severity: 'error' });
            }
            else{
                setSnackbar({ open: true, message: error.response.data.error, severity: 'error' });
            }
            console.log(error.response.data.error)
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <>
    {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        <FormField
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          errorMessage={errorMessages.name}
          required
          className="input_field"
        />
        <FormField
          type="phone_number"
          name="phone_no"
          placeholder="Enter your mobile number"
          value={formData.phone_no}
          onChange={handleChange}
          error={errors.phone_no}
          errorMessage={errorMessages.phone_no}
          required
          className="input_field"
        />
        {showOtpField && (
          <FormField
            type="tel"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            error={errors.otp}
            errorMessage={errorMessages.otp}
            required
            className="input_field"
          />
        )}
      </Box>
      {errorMessages.apiError && (
        <div className="error-message">{errorMessages.apiError}</div>
      )}
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          <Box component="img" src={arrow_icon} alt="arrow_icon" />
        </Button>
      </Box>
    </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default UserForm;
