import React, { useState } from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import takeaway from '../../../Utils/images/Sell/shop_details/takeaway.webp';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';

function TakeAway({title}) {

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
        estimated_availability_time:'',
        confirmation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Take-Away Location',
            name: 'location',
            type: 'text',
        },
        {
            id: 2,
            label: 'Take-Away Hours',
            name: 'hours',
            type: 'time',
        },
        {
            id: 3,
            label: 'Estimated availability time',
            name: 'estimated_availability_time',
            type: 'time',
        },
        {
            id: 4,
            label: 'Take-Away Instructions',
            name: 'instructions',
            type: 'text',
        },
        {
            id: 5,
            label: 'Take-Away Confirmation',
            name: 'confirmation',
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
                    <Box component='img' src={takeaway} alt="pickup" className='icon' />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default TakeAway