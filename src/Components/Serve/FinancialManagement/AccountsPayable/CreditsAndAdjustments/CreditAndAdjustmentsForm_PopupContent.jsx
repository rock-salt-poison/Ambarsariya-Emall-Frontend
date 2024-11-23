import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function CreditAndAdjustmentsForm_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        vendor:'',
        credit_amounts:'',
        debit:'',
        additional_charges:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const formFields = [
        {
            id: 1,
            label: 'Select Vendor/Merchant',
            name: 'vendor',
            type: 'select',
            options:['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D']
        },
        {
            id: 2,
            label: 'Credit Amounts',
            name: 'credit_amounts',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 3,
            label: 'Debit Memos',
            name: 'debits',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 4,
            label: 'Additional Charges',
            name: 'additional_charges',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },  
        {
            id: 5,
            label: 'Last 5 payments',
            name: 'last_payments',
            type: 'textarea',
            readOnly:true
        }, 
        {
            id: 6,
            label: 'Balance',
            name: 'balance',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 7,
            label: 'Pay by credits',
            name: 'credits',
            type: 'text',
            behavior:'numeric',
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

export default CreditAndAdjustmentsForm_PopupContent;
