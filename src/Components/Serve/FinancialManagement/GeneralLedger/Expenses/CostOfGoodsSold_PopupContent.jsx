import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function CostOfGoodsSold_PopupContent() {
    const initialData = {
        category: '',
        products: '',
        items: '',
        date_time: '',
        sale: '',
        cost_price: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: ['Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        {
            id: 2,
            label: 'Select Products',
            name: 'products',
            type: 'select',
            options: ['Pain Relief', 'Antibiotics', 'Multivitamins', 'Omega-3', 'Surgical Instruments']
        },
        {
            id: 3,
            label: 'Select Item',
            name: 'items',
            type: 'select',
            options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
        },
        {
            id: 4,
            label: 'Date / Time',
            name: 'date_time',
            type: 'daterange'
        },
        {
            id: 5,
            label: 'Total no of sale',
            name: 'sale',
            type: 'number',
            readOnly: true,
        },
        {
            id: 6,
            label: 'Total Cost Price',
            name: 'cost_price',
            type: 'text',
            behavior: 'numeric'
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
            description="The direct costs associated with producing or  purchasing the inventory that has been sold."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default CostOfGoodsSold_PopupContent;
