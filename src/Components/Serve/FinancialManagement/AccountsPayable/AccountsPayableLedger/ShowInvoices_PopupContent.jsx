import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function ShowInvoices_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        selected_daterange:'',
        members:'',
        selected_invoices:'',
        download_invoice:'',
        seller_contact:'',
        buyer_contact:'',
        subtotal:'',
        total_amount:'',
        paid_amount:'',
        balance:'',
        due_date:'',
        tax:'',
        credit_limit:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const formFields = [
        {
            id: 1,
            label: 'Select Vendor(s)',
            name: 'members',
            type: 'select-check',
            options: ['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4', 'Vendor 5', 'Vendor 6', 'Vendor 7']
        },
        {
            id: 2,
            label: 'Select Date',
            name: 'selected_daterange',
            type: 'daterange',
        },
        {
            id:3,
            label: 'Select Invoice No(s)',
            name: 'selected_invoices',
            type: 'select-check',
            options: ['Invoice 1', 'Invoice 2', 'Invoice 3', 'Invoice 4', 'Invoice 5', 'Invoice 6', 'Invoice 7'],
        },
        {
            id: 4,
            label: 'Download Invoice',
            name: 'download_invoice',
            type: 'button',
            value:'Download PDF',
            handleButtonClick:handleButtonClick
        },
        {
            id: 5,
            label: 'Seller contact information',
            name: 'seller_contact',
            type: 'textarea',
            value:`Business Name : Apna departmental
Address : 123 tilak nagar
Phone : 7894561320
Email: abc@gmail.com`,
            rows:4,
        },
        {
            id: 6,
            label: 'Buyer contact information',
            name: 'buyer_contact',
            type: 'textarea',
            value:`Business Name : Apna departmental store
Address : 123 tilak nagar
Phone : 7894561320
Email: abc@gmail.com`,
            rows:4,
        },
        {
            id: 7,
            label: 'Subtotal',
            name: 'subtotal',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 8,
            label: 'Total Amount',
            name: 'total_amount',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 9,
            label: 'Paid Amount',
            name: 'paid_amount',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 10,
            label: 'Balance Amount',
            name: 'balance_amount',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 11,
            label: 'Due date',
            name: 'due_date',
            type: 'date',
        },  
        {
            id: 12,
            label: 'Tax',
            name: 'tax',
            type: 'text',
            behavior:'numeric',
        },   
        {
            id: 13,
            label: 'Credit limit',
            name: 'credit_limit',
            type: 'text',
            behavior:'numeric',
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



export default ShowInvoices_PopupContent;
