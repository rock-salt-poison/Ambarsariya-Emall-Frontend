import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, ThemeProvider, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import takeaway from '../../../Utils/images/Sell/shop_details/takeaway.webp';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import { getShopTakeawaySettings, postShopTakeawaySettings, getShopUserData, getUser } from '../../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../../CustomSnackbar';

function TakeAway({title, fieldSet = 'cart', shop_no, onFormDataChange, shopAccessToken, handleClose}) {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);
      const userAccessToken = useSelector((state) => state.auth.userAccessToken);

    const initialData = {
        takeaway_available: 'No',
        hours: '',
        takeaway_slot_minutes: '',
        takeaway_location: '',
        takeaway_instruction: '',
        slot_start_time: '',
        instructions: '',
        confirmation: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [parkingAvailability, setParkingAvailability] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    // Fetch takeaway settings and shop address for merchant (standardFit)
    useEffect(() => {
        const fetchTakeawaySettings = async () => {
          if (!shop_no || fieldSet !== 'standardFit') return;
      
          try {
            setLoading(true);
            
            // Get shop_access_token from user data if not provided
            let shopToken = shopAccessToken;
            if (!shopToken && userAccessToken) {
              const userData = await getUser(userAccessToken);
              const shopUser = userData?.find((u) => u.shop_no !== null);
              shopToken = shopUser?.shop_access_token;
            }
            
            // Fetch takeaway settings and shop user data (for address)
            const [response, shopData] = await Promise.all([
              getShopTakeawaySettings(shop_no),
              shopToken ? getShopUserData(shopToken) : null
            ]);
            console.log(response, shopData);
            
            // Get shop address from shop user data
            const shopAddress = shopData?.[0]?.address || '';
      
            if (response?.exists && response?.data) {
                // Convert time strings to Date objects for DateRangePicker
                let hoursValue = null;
                
                if (response.data.takeaway_start_time && response.data.takeaway_end_time) {
                  const today = new Date();
                  const [startHours, startMins, startSecs] = response.data.takeaway_start_time.split(':');
                  const [endHours, endMins, endSecs] = response.data.takeaway_end_time.split(':');
                  
                  const startDate = new Date(today);
                  startDate.setHours(parseInt(startHours), parseInt(startMins), parseInt(startSecs || 0), 0);
                  
                  const endDate = new Date(today);
                  endDate.setHours(parseInt(endHours), parseInt(endMins), parseInt(endSecs || 0), 0);
                  
                  hoursValue = [startDate, endDate];
                }

                // Convert boolean to "Yes"/"No" for select field
                const takeawayAvailableValue = response.data.takeaway_available === true ? 'Yes' : 'No';

                // Always use shop address from shop user data for location
                setFormData({
                  takeaway_available: takeawayAvailableValue,
                  hours: hoursValue || '',
                  takeaway_slot_minutes: response.data.takeaway_slot_minutes || '',
                  takeaway_location: response.data.takeaway_location ||shopAddress  || '',
                  takeaway_instruction: response.data.takeaway_instruction || '',
                  slot_start_time: '',
                  instructions: '',
                  confirmation: '',
                });
            } else if (shopAddress) {
                // If no settings exist, pre-fill with shop address
                setFormData(prev => ({
                  ...prev,
                  takeaway_location: shopAddress
                }));
            }
          } catch (error) {
            console.error('Error fetching takeaway settings:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchTakeawaySettings();
      }, [shop_no, fieldSet, shopAccessToken, userAccessToken]);

    // Fetch takeaway settings and generate slots for buyer (cart)
    useEffect(() => {
        const fetchTakeawayDataForBuyer = async () => {
          if (!shop_no || fieldSet !== 'cart') return;
      
          try {
            setLoading(true);
            
            // Get shop_access_token from user data if not provided
            let shopToken = shopAccessToken;
            if (!shopToken && userAccessToken) {
              const userData = await getUser(userAccessToken);
              const shopUser = userData?.find((u) => u.shop_no !== null);
              shopToken = shopUser?.shop_access_token;
            }
            
            // Fetch takeaway settings and shop user data (for parking_availability)
            const [takeawayResponse, shopData] = await Promise.all([
              getShopTakeawaySettings(shop_no),
              shopToken ? getShopUserData(shopToken) : null
            ]);
            
            // Get parking_availability from shop data
            const parking = shopData?.[0]?.parking_availability ?? null;
            setParkingAvailability(parking);
            
            // Generate time slots if takeaway is available
            if (takeawayResponse?.exists && takeawayResponse?.data?.takeaway_available === true) {
              const { takeaway_start_time, takeaway_end_time, takeaway_slot_minutes } = takeawayResponse.data;
              
              if (takeaway_start_time && takeaway_end_time && takeaway_slot_minutes) {
                const slots = generateTimeSlots(takeaway_start_time, takeaway_end_time, takeaway_slot_minutes);
                setTimeSlots(slots);
              } else {
                setTimeSlots([]);
              }
            } else {
              setTimeSlots([]);
            }
          } catch (error) {
            console.error('Error fetching takeaway data for buyer:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchTakeawayDataForBuyer();
      }, [shop_no, fieldSet, shopAccessToken, userAccessToken]);

    // Generate time slots based on start time, end time, and slot duration
    const generateTimeSlots = (startTime, endTime, slotMinutes) => {
        const slots = [];
        
        // Parse time strings (format: "HH:MM:SS" or "HH:MM")
        const parseTime = (timeStr) => {
            const parts = timeStr.split(':');
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            return hours * 60 + minutes; // Convert to minutes since midnight
        };
        
        const formatTime = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        };
        
        const startMinutes = parseTime(startTime);
        const endMinutes = parseTime(endTime);
        
        // Generate slots
        for (let current = startMinutes; current < endMinutes; current += slotMinutes) {
            const slotStart = formatTime(current);
            const slotEnd = formatTime(Math.min(current + slotMinutes, endMinutes));
            slots.push({
                value: slotStart,
                label: `${slotStart} - ${slotEnd}`
            });
        }
        
        return slots;
    };

    // Get form fields based on fieldSet - memoize to prevent unnecessary recalculations
    const getFormFields = React.useCallback(() => {
        if (fieldSet === 'standardFit') {
            // For merchant: takeaway_available, hours (time-range), takeaway_slot_minutes, takeaway_location, takeaway_instruction
            return [
        {
            id: 1,
                    label: 'Takeaway Available',
                    name: 'takeaway_available',
                    type: 'select',
                    options: ['Yes', 'No']
        },
        {
            id: 2,
                    label: 'Takeaway Hours',
            name: 'hours',
            type: 'time-range',
        },
        {
            id: 3,
                    label: 'Estimated availability slots',
                    name: 'takeaway_slot_minutes',
            type: 'select',
                    options: [5, 10, 20, 30]
        },
        {
            id: 4,
                    label: 'Takeaway Location',
                    name: 'takeaway_location',
                    type: 'address',
        },
        {
            id: 5,
                    label: 'Takeaway Instruction',
                    name: 'takeaway_instruction',
                    type: 'textarea',
                    rows: 3,
                },
            ];
        } else {
            // For buyer (cart): slot_start_time (select with generated slots), instructions, confirmation
            return [
                {
                    id: 1,
                    label: 'Estimated availability time',
                    name: 'slot_start_time',
                    type: 'select' ,
                    options: timeSlots.length > 0 ? timeSlots : [],
                    placeholder: 'Select time slot'
                },
                {
                    id: 2,
                    label: 'Take-Away Instructions',
                    name: 'instructions',
                    type: 'textarea',
                    rows: 3,
                },
                {
                    id: 3,
                    label: 'Take-Away Confirmation',
                    name: 'confirmation',
                    type: 'select',
                    options: ['Yes', 'No']
                },
            ];
        }
    }, [fieldSet, timeSlots]);
    
    const formFields = getFormFields();

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        let updatedValue = value;

        // Keep takeaway_available as "Yes"/"No" string for select field
        // (will convert to boolean only when submitting to API)

        // Handle address field (can be object or string)
        if (name === 'takeaway_location' && typeof value === 'object') {
            updatedValue = value.formatted_address || value.description || value;
        }

        // Handle slot_start_time: if it's a select with slots, get the actual time value
        if (name === 'slot_start_time' && fieldSet === 'cart' && timeSlots.length > 0) {
            // The Select component returns option.value (the time string like "10:00")
            // We need to ensure we store the exact value that matches the slot.value
            const selectedSlot = timeSlots.find(slot => {
                // Match by value (exact string match)
                return slot.value === value || slot.value === String(value);
            });
            
            if (selectedSlot) {
                updatedValue = selectedSlot.value; // Store the actual time value (HH:MM) as string
            } else {
                // If not found by value, try to find by label (in case Select returns label)
                const selectedByLabel = timeSlots.find(slot => slot.label === value);
                if (selectedByLabel) {
                    updatedValue = selectedByLabel.value;
                } else {
                    // If still not found, keep the value as-is (might be a new selection)
                    updatedValue = value;
                }
            }
        }

        const updatedData = { ...formData, [name]: updatedValue };
        setFormData(updatedData);

        // Clear any previous error for this field
        const newErrors = { ...errors, [name]: null };

        // Real-time validation for hours field (time-range)
        if (name === 'hours' && Array.isArray(updatedValue) && updatedValue.length === 2) {
            const startTime = new Date(updatedValue[0]);
            const endTime = new Date(updatedValue[1]);
            
            // Check if dates are valid
            if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                if (endTime <= startTime) {
                    newErrors.hours = "End time must be greater than start time.";
                }
            }
        }

        setErrors(newErrors);

        // Notify parent component (for cart fieldSet)
        if (onFormDataChange && fieldSet === 'cart') {
            onFormDataChange(updatedData);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (fieldSet === 'standardFit') {
            // Validate merchant form
            if (formData.takeaway_available === 'Yes') {
                if (!formData.hours || !Array.isArray(formData.hours) || formData.hours.length !== 2) {
                    newErrors.hours = "Takeaway hours are required when takeaway is available.";
                } else {
                    // Validate that both times are valid Date objects
                    const startTime = new Date(formData.hours[0]);
                    const endTime = new Date(formData.hours[1]);
                    
                    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
                        newErrors.hours = "Please select valid start and end times.";
                    } else if (endTime <= startTime) {
                        newErrors.hours = "End time must be greater than start time.";
                    }
                }
                if (!formData.takeaway_slot_minutes) {
                    newErrors.takeaway_slot_minutes = "Slot minutes is required when takeaway is available.";
                }
            }
        } else {
            // Validate buyer form
        formFields.forEach(field => {
            const name = field.name;
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            console.log(errors);
            return;
        }

        if (fieldSet === 'standardFit' && shop_no) {
            // Save takeaway settings for merchant
            try {
                setLoading(true);
                
                // Extract start_time and end_time from hours (time-range)
                let takeaway_start_time = null;
                let takeaway_end_time = null;
                
                if (formData.hours && Array.isArray(formData.hours) && formData.hours.length === 2 && formData.hours[0] && formData.hours[1]) {
                    try {
                        const startDate = new Date(formData.hours[0]);
                        const endDate = new Date(formData.hours[1]);
                        
                        // Validate dates are valid and end time is greater than start time
                        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                            if (endDate <= startDate) {
                                setSnackbar({
                                    open: true,
                                    message: "End time must be greater than start time.",
                                    severity: 'error'
                                });
                                setLoading(false);
                                return;
                            }
                            // Extract time portion (HH:MM:SS)
                            takeaway_start_time = startDate.toTimeString().slice(0, 8); // HH:MM:SS
                            takeaway_end_time = endDate.toTimeString().slice(0, 8); // HH:MM:SS
                        }
                    } catch (error) {
                        console.error("Error parsing time range:", error);
                        setSnackbar({
                            open: true,
                            message: "Error parsing time range. Please check your input.",
                            severity: 'error'
                        });
                        setLoading(false);
                        return;
                    }
                }

                // Handle address field (can be object or string)
                let takeaway_location = formData.takeaway_location;
                if (typeof takeaway_location === 'object') {
                    takeaway_location = takeaway_location.formatted_address || takeaway_location.description || '';
                }
                
                // Convert "Yes"/"No" to boolean for database
                const takeawayAvailable = formData.takeaway_available === 'Yes' ? true : false;
                
                const response = await postShopTakeawaySettings({
                    shop_no,
                    takeaway_available: takeawayAvailable,
                    takeaway_start_time,
                    takeaway_end_time,
                    takeaway_slot_minutes: formData.takeaway_slot_minutes ? parseInt(formData.takeaway_slot_minutes) : null,
                    takeaway_location,
                    takeaway_instruction: formData.takeaway_instruction
                });
                
                setSnackbar({
                    open: true,
                    message: response.message || 'Takeaway settings saved successfully!',
                    severity: 'success'
                });
            } catch (error) {
                console.error('Error saving takeaway settings:', error);
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || 'Failed to save takeaway settings. Please try again.',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        } else if (fieldSet === 'cart' && onFormDataChange) {
            // For cart fieldSet, pass form data to parent
            const cartFormData = {
                slot_start_time: formData.slot_start_time,
                instructions: formData.instructions,
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
                    {/* Parking Availability Message */}
                    {fieldSet === 'cart' && parkingAvailability !== null && (
                        <Box sx={{ mb: 2, px: 2, py: 1, bgcolor: parkingAvailability === 0 ? 'var(--yellow)' : 'var(--yellow)', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: parkingAvailability === 0 ? 'var(--error)' : 'var(--brown)' }}>
                                {parkingAvailability === 0 
                                    ? "No Parking Available" 
                                    : `Parking Available (Max ${parkingAvailability} vehicles per slot)`
                                }
                            </Typography>
                        </Box>
                    )}
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
                    <Box component='img' src={takeaway} alt="takeaway" className='icon' />
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

export default TakeAway