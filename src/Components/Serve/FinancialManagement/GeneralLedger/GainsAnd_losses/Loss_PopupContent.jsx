import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Loss_PopupContent() {
    const initialData = {
        loss:'',
        profit:'',
        item:'',
        product:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Loss',
            name: 'loss',
            type: 'select',
            options: ['Loss-1', 'Loss-2', 'Loss-3', 'Loss-4', 'Loss-5']
        },
        {
            id: 2,
            label: 'Total Profit',
            name: 'profit',
            placeholder:'Total profit < Selling Price',
            type: 'text',
            readOnly:true,
        },
        {
            id: 3,
            label: 'Item(s)',
            name: 'item',
            type: 'text',
            readOnly:true
        },
        {
            id: 4,
            label: 'Product',
            name: 'product',
            type: 'text',
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
            description="Loss incurred when selling a fixed asset at a price lower than its book value."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Loss_PopupContent;
