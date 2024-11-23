import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function VendorInformation_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        category:'',
        supplier:'',
        suppliers_transport_service:'',
        last_conversation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: ['Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        {
            id: 2,
            label: 'Select Supplier',
            name: 'supplier',
            type: 'select',
            options: ['Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4', 'Supplier 5']
        },
        {
            id: 3,
            label: 'Suppliers Transport Service',
            name: 'suppliers_transport_service',
            type: 'text',
            readOnly:true
        },
        {
            id: 4,
            label: 'Last conversation',
            name: 'last_conversation',
            type: 'text',
            readOnly:true
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
        />
        </ThemeProvider>
    );
}

export default VendorInformation_PopupContent;
