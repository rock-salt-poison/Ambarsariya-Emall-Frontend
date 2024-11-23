import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider, Box, Button } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function PoNumber_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
    };

    const theme = createCustomTheme(themeProps);

    const initialData = {
        product: '',
        group: '',
        shop_no: '',
        selected_daterange: '',
        po: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state for submission status

    const formFields = [
        {
            id: 1,
            label: 'Select Products',
            name: 'product',
            type: 'select',
            options: ['Pain Relief', 'Antibiotics', 'Multivitamins', 'Omega-3', 'Surgical Instruments']
        },
        {
            id: 2,
            label: 'Select Group',
            name: 'group',
            type: 'select',
            options: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5']
        },
        {
            id: 3,
            label: 'Select Shop No or Vendor',
            name: 'shop_no',
            type: 'select',
            options: ['Shop_00001', 'Shop_00002', 'Shop_00003', 'Shop_00004', 'Shop_00005']
        },
        {
            id: 4,
            label: 'Select Date',
            name: 'selected_daterange',
            type: 'daterange',
        },
        {
            id: 5,
            label: 'Select P.O.',
            name: 'po',
            type: 'select',
            options: ['Purchase Order 1', 'Purchase Order 2', 'Purchase Order 3', 'Purchase Order 4', 'Purchase Order 5']
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
        event.preventDefault(); 
        if (validateForm()) {
            console.log(formData);
            // Proceed with further submission logic, e.g., API call
            setIsFormSubmitted(true); 
        } else {
            console.log(errors);
        }
    };

    const handleOpenPO = () => {
        console.log("Opening P.O...");
        // Implement logic to open the P.O
    };

    const handleDownloadPO = () => {
        console.log("Downloading P.O...");
        // Implement logic to download the P.O
    };

    return (
        <ThemeProvider theme={theme}>
            <GeneralLedgerForm
                description="Purchase Order Number : 1012_P.O_27-9-24"
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            />

            {/* Conditionally render buttons after form submission */}
            {isFormSubmitted && (
                <Box className="post-submit-actions">
                    <Button variant="contained" onClick={handleOpenPO} className="post_submit_button">
                        Open P.O
                    </Button>
                    <Button variant="contained" onClick={handleDownloadPO} className="post_submit_button" >
                        Download P.O
                    </Button>
                </Box>
            )}
        </ThemeProvider>
    );
}

export default PoNumber_PopupContent;
