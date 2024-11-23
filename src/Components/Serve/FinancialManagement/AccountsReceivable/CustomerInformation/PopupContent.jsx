import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function PopupContent() {
    const initialData = {
        name:'',
        address:'',
        phone_number:'',
        email:'',
        account_number:'',
        credit_terms:'',
        credit_limit:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Name',
            name: 'name',
            type: 'text',
        },
        {
            id: 2,
            label: 'Address',
            name: 'address',
            type: 'text',
        },
        {
            id: 3,
            label: 'Phone Number',
            name: 'phone_number',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 4,
            label: 'Email',
            name: 'email',
            type: 'email',
        },
        {
            id: 5,
            label: 'Account Number',
            name: 'account_number',
            type: 'text',
        },
        {
            id: 6,
            label: 'Credit terms',
            name: 'credit_terms',
            type: 'text',
        },
        {
            id: 7,
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
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default PopupContent