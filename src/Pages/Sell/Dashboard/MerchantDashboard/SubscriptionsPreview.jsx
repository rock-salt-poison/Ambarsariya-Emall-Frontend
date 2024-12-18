import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';

function SubscriptionsPreview() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        member:'',
        products:'',
        subscription_type:'',
        start_date:'',
        end_date:'',
        credit:'',
        balance:'',
        mou_date_issue:'',
        end_date:'',
        mou_reserve:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const formFields = [
        {
            id: 1,
            label: 'Select Member No.',
            name: 'member',
            type: 'select',
            options: ['User 1','User 2', 'User 3','User 4', 'User 5','User 6','User 7','User 8','User 9','User 10']
        },
        {
            id: 2,
            label: 'Product(s)',
            name: 'products',
            type: 'textarea',
            value:`Product 1 \nProduct 2 \nProduct 3 \nProduct 4`,
            rows:2,
            readOnly:true,
        },
        {
            id:3,
            label: 'Subscription Type',
            name: 'subscription_type',
            type: 'textarea',
            value:`Daily\nWeekly`,
            rows:2,
            readOnly:true,
        },
        {
            id: 4,
            label: 'Start Date',
            name: 'start_date',
            type: 'date',
            readOnly:true,
        },
        {
            id: 5,
            label: 'End Date',
            name: 'end_date',
            type: 'date',
            readOnly:true,
        },
        {
            id: 6,
            label: 'Credit',
            name: 'credit',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
             adornmentValue:'Rs'
        },
        {
            id: 7,
            label: 'Balance',
            name: 'balance',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
             adornmentValue:'Rs'
        },
        {
            id: 8,
            label: 'MoU date issue',
            name: 'mou_date_issue',
            type: 'date',
            readOnly:true,
        },  
        {
            id: 9,
            label: 'End Date',
            name: 'end_date',
            type: 'date',
            readOnly:true,
        },   
        {
            id: 10,
            label: 'MoU Reserve',
            name: 'mou_reserve',
            type: 'text',
            readOnly:true,
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
            submitBtnVisibility={false}
        />
        </ThemeProvider>
    );
}

export default SubscriptionsPreview