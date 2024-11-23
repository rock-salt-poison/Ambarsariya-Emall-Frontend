import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { Box, ThemeProvider, Button } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';
import pdf_icon from '../../../../../Utils/images/Serve/emotional/merchant_campaign/pdf.png'

function ReconciliationForm_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

      const [buttonDisable , setButtonDisable] = useState(true);

    const initialData = {
        date_range:'',
        product_orders:'',
        balance_amount:'',
        last_due_date:'',
        after_due_date_balance:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select Date',
            name: 'date_range',
            type: 'daterange',
        },
        {
            id: 2,
            label: 'Select P.O(s)',
            name: 'product_orders',
            type: 'select-check',
            options:['Purchase Order 1', 'Purchase Order 2', 'Purchase Order 3', 'Purchase Order 4','Purchase Order 5','Purchase Order 6'],
        },
        {
            id: 3,
            label: 'Invoice(s) Total Amount',
            name: 'invoices_total_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 4,
            label: 'Credit from vendor(s)',
            name: 'credit_from_vendor',
            type: 'text',
            readOnly:true
        },
        {
            id: 5,
            label: 'Balance Amount (s)',
            name: 'balance_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },   
        {
            id: 6,
            label: 'Additional Charges',
            name: 'additional_charges',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },     
    ];

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        
        const isFormComplete = formData.date_range && formData.product_orders;
        setButtonDisable(!(isFormComplete && value)); 

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const handleMailButton = () => {}

    const handleWhatsapp = () => {} 

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
            submitBtnVisibility={false}
        />

        
            <Box className="post-submit-actions">
                <Button variant="contained" onClick={handleMailButton} className="post_submit_button" disabled={buttonDisable}>
                    <Box component="img" src={pdf_icon} alt="pdf" className='icon'/>
                    Send mail to vendor
                </Button>
                <Button variant="contained" onClick={handleWhatsapp} className="post_submit_button" disabled={buttonDisable} >
                    <Box component="img" src={pdf_icon} alt="pdf" className='icon'/>
                    Send via Whatsapp
                </Button>
            </Box>

        </ThemeProvider>
    );
}

export default ReconciliationForm_PopupContent;
