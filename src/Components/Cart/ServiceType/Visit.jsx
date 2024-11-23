import React, { useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import home_visit from '../../../Utils/images/Sell/shop_details/home_visit.svg'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';

function Visit() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        visit_scheduling:'',
        location:'',
        time_slots:'',
        limit:'',
        visit_duration:'',
        appointment_confirmation:'',
        rescheduling_or_cancellation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Visit Scheduling',
            name: 'visit_scheduling',
            type: 'datetime-local',
        },
        {
            id: 2,
            label: 'Choose Location',
            name: 'location',
            type: 'text',
        },
        {
            id: 3,
            label: 'Available time slots',
            name: 'time_slots',
            type: 'select',
            options:['Morning','Afternoon','Evening','Night'],
        },
        {
            id: 4,
            label: 'Booking Limit',
            name: 'limit',
            type: 'text',
        },
        {
            id: 5,
            label: 'Visit Duration',
            name: 'visit_duration',
            type: 'text',
        },
        {
            id: 6,
            label: 'Appointment Confirmation',
            name: 'appointment_confirmation',
            type: 'text',
        },
        {
            id: 7,
            label: 'Rescheduling / canceling',
            name: 'rescheduling_or_cancellation',
            type: 'text',
        },
    ];

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            console.log(formData);
            // Proceed with further submission logic, e.g., API call
        } else {
            console.log(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="col">
                <Box className="delivery_container">
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
                    <Box component='img' src={home_visit} alt="delivery" className='icon visit' />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Visit