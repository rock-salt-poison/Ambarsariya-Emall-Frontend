import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Drawings_PopupContent() {
    const initialData = {
        equity_owner:'',
        withdrawn:'',
        investment_left:'0',
        available_amount:'0',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Equity owner',
            name: 'equity_owner',
            type: 'select',
            options: ['Owner 1', 'Owner 2', 'Owner 3', 'Owner 4', 'Owner 5']
        },
        {
            id: 2,
            label: 'Select Withdrawn',
            name: 'withdrawn',
            type: 'select',
            options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
        },
        {
            id: 3,
            label: 'Total Investment Left',
            name: 'investment_left',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 4,
            label: 'Available Amount',
            name: 'available_amount',
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
        <GeneralLedgerForm
            description="Money withdrawn by the owner for personal use (in the case of sole proprietorships or partnerships)."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Drawings_PopupContent;
