import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function AgingOfPayableForm_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        invoice_no:'',
        balance_amount:'',
        last_due_date:'',
        after_due_date_balance:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select Invoice No.',
            name: 'invoice_no',
            type: 'select',
            options:['123', '465', '789', '101'],
        },
        {
            id: 2,
            label: 'Balance Amount',
            name: 'balance_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 3,
            label: 'Last Due Date',
            name: 'last_due_date',
            type: 'date',
            readOnly:true
        },
        {
            id: 4,
            label: 'Amount increases after due date by 5% per day',
        },
        {
            id: 5,
            label: 'Balance Amount (Today)',
            name: 'after_due_date_balance',
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
            description="Balance Invoices only"
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={false}
        />
        </ThemeProvider>
    );
}

export default AgingOfPayableForm_PopupContent;
