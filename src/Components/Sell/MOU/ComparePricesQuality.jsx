import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function ComparePricesQuality() {
    const initialData = {
        items:'',
        groups:'',
        vendor_or_shop:'',
        requirements:'',
        receive_quote_price:'',
        price_and_quality:'',
        send_to_vendor:'',
        receive_from_vendor:'',
        final_price:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select item(s)',
            name: 'items',
            type: 'select-check',
            options:['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5','Item 6', 'Item 7','Item 8','Item 9','Item 10'],
        },
        {
            id: 2,
            label: 'Select group (s)',
            name: 'groups',
            type: 'select-check',
            options:['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5','Group 6', 'Group 7','Group 8','Group 9','Group 10'],
        },
        {
            id: 3,
            label: 'Vendor / Shop Wise',
            name: 'vendor_or_shop',
            type: 'text',
        },
        {
            id: 4,
            label: 'Send Requirements',
            name: 'requirements',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Receive quote price and sample',
            name: 'receive_quote_price',
            type: 'text',
        },
        {
            id: 6,
            label: 'Set price and quality',
            name: 'price_and_quality',
            type: 'text',
        },
        {
            id: 7,
            label: 'Send to vendor',
            name: 'send_to_vendor',
            type: 'text',
        },
        {
            id: 8,
            label: 'Receive from vendor',
            name: 'receive_from_vendor',
            type: 'text',
        },
        {
            id: 9,
            label: 'Fix final price',
            name: 'final_price',
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
    <GeneralLedgerForm
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        submitButtonText="Repeat the bidding"
    />
  )
}

export default ComparePricesQuality