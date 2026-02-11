import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, ThemeProvider, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import pickup from '../../../Utils/images/Sell/shop_details/pickup.svg';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import { getShopPickupSettings, postShopPickupSettings } from '../../../API/fetchExpressAPI';
import dayjs from 'dayjs';
import CustomSnackbar from '../../CustomSnackbar';

function Pickup({title, fieldSet = 'cart', shop_no, onFormDataChange, shopAccessToken, handleClose}) {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        availability:'',
        location:'',
        hours:'',
        instructions:'',
        estimated_pickup_time:'',
        confirmation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pickupTimeRange, setPickupTimeRange] = useState({ minTime: null, maxTime: null });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    console.log(pickupTimeRange, shop_no);
    

    // Fetch pickup settings for both standardFit and cart (to get time range for cart)
    useEffect(() => {
        const fetchPickupSettings = async () => {
          if (!shop_no) return;
      
          try {
            setLoading(true);
            const response = await getShopPickupSettings(shop_no);
            console.log(response);
      
            if (response?.exists && response?.data) {
                // Convert time strings to Date objects for DateRangePicker
                let hoursValue = null;
                let minTime = null;
                let maxTime = null;
                
                if (Array.isArray(response.data.hours) && response.data.hours.length === 2) {
                  const [startTime, endTime] = response.data.hours;
                  if (startTime && endTime) {
                    // Create Date objects with today's date and the time from database
                    const today = new Date();
                    const [startHours, startMins, startSecs] = startTime.split(':');
                    const [endHours, endMins, endSecs] = endTime.split(':');
                    
                    const startDate = new Date(today);
                    startDate.setHours(parseInt(startHours), parseInt(startMins), parseInt(startSecs || 0), 0);
                    
                    const endDate = new Date(today);
                    endDate.setHours(parseInt(endHours), parseInt(endMins), parseInt(endSecs || 0), 0);
                    
                    hoursValue = [startDate, endDate];                    
                    
                    // Store time range for estimated_pickup_time restriction (for cart fieldSet)
                    // Convert "HH:mm:ss" to "HH:mm" for HTML time input
                    minTime = startTime.substring(0, 5); // "HH:mm" format
                    maxTime = endTime.substring(0, 5);   // "HH:mm" format
                    setPickupTimeRange({ minTime, maxTime });
                  }
                }
      
              if (fieldSet === 'standardFit') {
                setFormData({
                  availability: response.data.availability || '',
                  location: response.data.location?.formatted_address || response.data.location || '',
                  hours: hoursValue || '',
                  instructions: '',
                  estimated_pickup_time: '',
                  confirmation: response.data.confirmation || ''
                });
              }
            }
          } catch (error) {
            console.error('Error fetching pickup settings:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchPickupSettings();
      }, [shop_no, fieldSet]);


    // Get form fields with dynamic time restrictions
    const getFormFields = () => {
        // Base fields definition
        const allFields = [
            {
                id: 1,
                label: 'Pickup Availability',
                name: 'availability',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                id: 2,
                label: 'Pickup Location',
                name: 'location',
                type: 'address',
            },
            {
                id: 3,
                label: 'Pickup Hours',
                name: 'hours',
                type: 'time-range',
            },
            {
                id: 4,
                label: 'Pickup Instructions',
                name: 'instructions',
                type: 'textarea',
            },
            {
                id: 5,
                label: 'Estimated pickup time',
                name: 'estimated_pickup_time',
                type: 'time',
                minTime: pickupTimeRange.minTime,
                maxTime: pickupTimeRange.maxTime,
            },
            {
                id: 6,
                label: 'Pickup Confirmation',
                name: 'confirmation',
                type: 'select',
                options: ['Yes', 'No']
            },
        ];

        if (fieldSet === 'standardFit') {
            // For StandardFit: availability, location, hours, confirmation
            return allFields.filter(field => 
                ['availability', 'location', 'hours', 'confirmation'].includes(field.name)
            );
        } else {
            // For Cart: instructions, estimated_pickup_time, confirmation
            return allFields.filter(field => 
                ['instructions', 'estimated_pickup_time', 'confirmation'].includes(field.name)
            );
        }
    };

    const formFields = getFormFields();

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // Validate estimated_pickup_time is within merchant's time range (for cart fieldSet)
        if (name === 'estimated_pickup_time' && fieldSet === 'cart' && pickupTimeRange.minTime && pickupTimeRange.maxTime) {
            if (value) {
                const selectedTime = value; // "HH:mm" format
                // Compare times as strings (works for HH:mm format)
                if (selectedTime < pickupTimeRange.minTime || selectedTime > pickupTimeRange.maxTime) {
                    // Reset to previous value and show error
                    event.target.value = formData[name] || '';
                    setErrors({ ...errors, [name]: `Estimated pickup time must be between ${pickupTimeRange.minTime} and ${pickupTimeRange.maxTime}` });
                    return; // Don't update formData with invalid value
                }
            }
        }

        let updatedData = { ...formData, [name]: value };
        let updatedErrors = { ...errors, [name]: null };

        setFormData(updatedData);
        setErrors(updatedErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
            
            // Additional validation for estimated_pickup_time
            if (name === 'estimated_pickup_time' && fieldSet === 'cart' && pickupTimeRange.minTime && pickupTimeRange.maxTime) {
                if (formData[name]) {
                    const selectedTime = formData[name];
                    if (selectedTime < pickupTimeRange.minTime || selectedTime > pickupTimeRange.maxTime) {
                        newErrors[name] = `Estimated pickup time must be between ${pickupTimeRange.minTime} and ${pickupTimeRange.maxTime}`;
                    }
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            // Only submit if shop_no is available and fieldSet is 'standardFit'
            if (fieldSet === 'standardFit' && shop_no) {
                try {
                    setLoading(true);
                    
                    const response = await postShopPickupSettings({
                        shop_no,
                        availability: formData.availability,
                        location: formData.location,
                        hours: formData.hours,
                        confirmation: formData.confirmation
                    });
                    
                    setSnackbar({
                        open: true,
                        message: response.message || 'Pickup settings saved successfully!',
                        severity: 'success'
                    });
                    
                    // Optionally reset form after successful submission
                    // setFormData(initialData);
                } catch (error) {
                    console.error('Error saving pickup settings:', error);
                    setSnackbar({
                        open: true,
                        message: error.response?.data?.message || 'Failed to save pickup settings. Please try again.',
                        severity: 'error'
                    });
                } finally {
                    setLoading(false);
                }
            } else if (fieldSet === 'cart' && onFormDataChange) {
                // For cart fieldSet, pass only specific fields to parent on submit
                const cartFormData = {
                    instructions: formData.instructions,
                    estimated_pickup_time: formData.estimated_pickup_time,
                    confirmation: formData.confirmation
                };
                onFormDataChange(cartFormData);
                // Close popup after successful submission
                if (handleClose) {
                    handleClose();
                }
            } else {
                console.log(formData);
            }
        } else {
            console.log(errors);
        }
    };

    return (
        <>
        <ThemeProvider theme={theme}>
            {loading && <Box className="loading"><CircularProgress/> </Box> }
            <Box className="col">
                <Box className="pickup_container">
                    <Box className="title_container">
                        <Typography className="title">{title}</Typography>
                    </Box>

                    <Box className="form_container">
                    <GeneralLedgerForm
                        formfields={formFields}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        onChange={handleChange}
                        errors={errors}
                    />
                    </Box>
                </Box>
            </Box>
            <Box className="col">
                <Box className="image_container">
                    <Box component='img' src={pickup_truck_gif} alt="gif" className='gif' />
                    <Box component='img' src={pickup} alt="pickup" className='icon' />
                </Box>
            </Box>
        </ThemeProvider>
            <CustomSnackbar
                open={snackbar.open}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                severity={snackbar.severity}
                disableAutoHide={false}
            />
        </>
    )
}

export default Pickup