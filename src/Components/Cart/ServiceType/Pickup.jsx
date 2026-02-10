import React, { useState } from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import pickup from '../../../Utils/images/Sell/shop_details/pickup.svg';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';

function Pickup({title, fieldSet = 'cart'}) {

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

    // All available fields
    const allFields = [
        {
            id: 1,
            label: 'Pickup Availability',
            name: 'availability',
            type: 'text',
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
            type: 'time',
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
        },
        {
            id: 6,
            label: 'Pickup Confirmation',
            name: 'confirmation',
            type: 'text',
        },
    ];

    // Determine which fields to show based on fieldSet prop
    const getFormFields = () => {
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
                    <Box component='img' src={pickup} alt="pickup" className='icon' />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Pickup