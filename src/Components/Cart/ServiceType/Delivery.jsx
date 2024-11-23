import React, { useState } from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import delivery from '../../../Utils/images/Sell/shop_details/delivery.webp'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';

function Delivery() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        delivery_partner:'',
        invoice:'',
        dimension:'',
        weight:'',
        location:'',
        price:'',
        date_and_time:'',
        status:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Delivery Partner',
            name: 'delivery_partner',
            type: 'select',
            options:['Person 1','Person 2','Person 3','Person 4','Person 5','Person 6'],
        },
        {
            id: 2,
            label: 'Select Invoice',
            name: 'invoice',
            type: 'select',
            options:['Invoice 1','Invoice 2','Invoice 3','Invoice 4','Invoice 5','Invoice 6'],
        },
        {
            id: 3,
            label: 'Product Dimension',
            name: 'dimension',
            type: 'text',
        },
        {
            id: 4,
            label: 'Total Weight',
            name: 'weight',
            type: 'text',
        },
        {
            id: 5,
            label: 'Select location',
            name: 'location',
            type: 'text',
        },
        {
            id: 6,
            label: 'Price',
            name: 'price',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 7,
            label: 'Date / Time',
            name: 'date_and_time',
            type: 'datetime-local',
        },
        {
            id: 8,
            label: 'Tracking Status',
            name: 'status',
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
                <Box className="title_container">
                    <Typography className="title">Consignment</Typography>
                    <Typography className="title">Delivery</Typography>
                </Box>
                <Box className="image_container">
                    <Box component='img' src={delivery} alt="delivery" className='icon' />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Delivery