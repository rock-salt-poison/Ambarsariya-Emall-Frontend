import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function AwardProcess() {
    const initialData = {
        domain:'',
        sector:'',
        shop:'',
        reply_from_vendor:'',
        ranking_criteria:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select domain',
            name: 'domain',
            type: 'select',
            options:['Manufacturing', 'Retail','Health & Pharma'],
        },
        {
            id: 2,
            label: 'Select Sector',
            name: 'sector',
            type: 'select',
            options:['Sector 1', 'Sector 2','Sector 3','Sector 4'],
        },
        {
            id: 3,
            label: 'Select shop or create vendor',
            name: 'shop',
            type: 'select',
            options:['Shop 1', 'Shop 2']
        },
        {
            id: 4,
            label: 'Reply from Vendor (S)',
            name: 'reply_from_vendor',
            type: 'text',   
            readOnly:true
        },
        {
            id: 5,
            label: 'Define ranking criteria',
            name: 'ranking_criteria',
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
        submitButtonText="Send"
    />
  )
}

export default AwardProcess