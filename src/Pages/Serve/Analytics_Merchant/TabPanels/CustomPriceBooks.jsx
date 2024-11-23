import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import SearchIcon from '@mui/icons-material/Search';

function CustomPriceBooks() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        discounts:'',
        selling_price:'',
        update_in_stock_price:'',
        subscription:'',
        sale_order:'',
        gst:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Discounts / offers',
            name: 'discounts',
            type: 'text',
        },
        {
            id: 2,
            label: 'Selling Price',
            name: 'selling_price',
            type: 'text',
        },
        {
            id: 3,
            label: 'Update in-stock price',
            name: 'update_in_stock_price',
            type: 'text',
        },
        {
            id: 4,
            label: 'Select Subscription',
            name: 'subscription',
            type: 'select',
            options:['Subscription 1', 'Subscription 2', 'Subscription 3','Subscription 4'],
        },
        {
            id: 5,
            label: 'Select Sale Order',
            name: 'sale_order',
            type: 'select',
            options:['Sale Order 1', 'Sale Order 2', 'Sale Order 3', 'Sale Order 4', 'Sale Order 5', 'Sale Order 6'],
        },
        {
            id: 6,
            label: 'GST',
            name: 'gst',
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
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={true}
            submitButtonText="Send Offers"
        />
        </ThemeProvider>
    );
}

export default CustomPriceBooks;
