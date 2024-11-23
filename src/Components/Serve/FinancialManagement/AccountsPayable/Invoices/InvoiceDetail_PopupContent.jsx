import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function InvoiceDetail_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        selected_daterange:'',
        selected_po:'',
        invoice:'',
        total_amount:'',
        due_date:'',
        description_of_goods:'',
        item_name:'',
        cost_of_item:'',
        cost_of_items:'',
        no_of_items:'',
        total_tax:'',
        amount:'',
        sku_id_no:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const handleSkuFocus = (e) => {
        console.log('hi')
        e.target.style.cursor='pointer'
    }

    const formFields = [
        {
            id: 1,
            label: 'Select Date',
            name: 'selected_daterange',
            type: 'daterange',
        },
        {
            id: 2,
            label: 'Select P.O(s)',
            name: 'selected_po',
            type: 'select',
            options: ['Purchase Order 1', 'Purchase Order 2', 'Purchase Order 3', 'Purchase Order 4', 'Purchase Order 5']
        },
        {
            id: 3,
            label: 'Invoice',
            name: 'invoice',
            type: 'button',
            value:'Download PDF',
            handleButtonClick:handleButtonClick
        },
        {
            id: 4,
            label: 'Total Balance',
            name: 'total_amount',
            type: 'text',
            behavior:'numeric',

        },
        {
            id: 5,
            label: 'Due date',
            name: 'due_date',
            type: 'date',
        },
        {
            id: 6,
            label: 'Description of goods',
            name: 'description_of_goods',
            type: 'text',
        },
        {
            id: 7,
            label: 'Item Name',
            name: 'item_name',
            type: 'text',
        },
        {
            id: 8,
            label: 'Cost of item',
            name: 'cost_of_item',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 9,
            label: 'Cost of items',
            name: 'cost_of_items',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 10,
            label: 'No. of items',
            name: 'no_of_items',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 11,
            label: 'Total Tax',
            name: 'total_tax', 
            type: 'text',
            behavior: 'numeric',
        },
        {
            id: 12,
            label: 'Total Amount',
            name: 'amount', 
            type: 'text',
            behavior: 'numeric',
        },
        {
            id: 13,
            label: 'SKU Id No.',
            name: 'sku_id_no',
            type: 'text',
            behavior: 'numeric',
            handleFocus:handleSkuFocus,
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
            submitButtonText="Payment Detail"
            // submit button text payment detail
        />
        </ThemeProvider>
    );
}

export default InvoiceDetail_PopupContent;
