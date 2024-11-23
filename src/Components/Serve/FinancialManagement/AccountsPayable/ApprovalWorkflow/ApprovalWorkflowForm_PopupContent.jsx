import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function ApprovalWorkflowForm_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        employee:'',
        products:'',
        vendor_or_merchant:'',
        quantity_in_store:'',
        price:'',
        purchase_order:'',
        price_quote:'',
        final_price:'',
        date_for_delivery:'',
        status:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select Employee',
            name: 'employee',
            type: 'select',
            options:['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4'],
        },
        {
            id: 2,
            label: 'Select Product(s)',
            name: 'products',
            type: 'select-check',
            options: ['Product 1', 'Product 2','Product 3','Product 4','Product 5','Product 6','Product 7',],
        },
        {
            id: 3,
            label: 'Select Vendor / Merchant',
            name: 'vendor_or_merchant',
            type: 'select',
            options:['Merchant 1', 'Merchant 2', 'Merchant 3', 'Merchant 4', 'Merchant 5', 'Merchant 6'],
        },
        {
            id: 4,
            label: 'Quantity in store',
            name: 'quantity_in_store',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
        },
        {
            id: 5,
            label: 'Price (per unit)',
            name: 'price',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },     
        {
            id: 6,
            label: 'Select P.O',
            name: 'purchase_order',
            type: 'select',
            options: ['Purchase order 1', 'Purchase order 2', 'Purchase order 3', 'Purchase order 4'],
        },  
        {
            id: 7,
            label: 'Price quote',
            name: 'price_quote',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },  
        {
            id: 8,
            label: 'Final Price',
            name: 'final_price',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        }, 
        {
            id: 9,
            label: 'Date for delivery',
            name: 'date_for_delivery',
            type: 'date',
            readOnly:true
        },  
        {
            id: 10,
            label: 'Select status',
            name: 'status',
            type: 'select',
            options:['Pending', 'Rejected', 'Approved'],
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

export default ApprovalWorkflowForm_PopupContent;
