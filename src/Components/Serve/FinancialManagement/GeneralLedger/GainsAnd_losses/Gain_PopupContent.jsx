import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Gain_PopupContent() {
    const initialData = {
        category:'',
        products:'',
        items:'',
        cost_price:'',
        selling_price:'',
        profit:'0',
        gain:'0',
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
            label: 'Cost price',
            name: 'cost_price',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 5,
            label: 'Selling price',
            name: 'selling_price',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 6,
            label: 'Total Profit',
            name: 'profit',
            type: 'text',
            behavior: 'numeric',
            readOnly: true
        },
        {
            id: 7,
            label: 'Gain',
            name: 'gain',
            type: 'text',
            behavior: 'numeric',
            readOnly: true
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...formData, [name]: value };

        if (name === 'selling_price') {
            const cost = parseFloat(updatedData.cost_price) || 0; // Default to 0 if NaN
            const selling = parseFloat(updatedData.selling_price) || 0; // Default to 0 if NaN
            const profit = selling - cost;
            const gain = (profit /selling)*100; // Gain is only positive profit

            updatedData.profit = profit.toString(); // Update profit as string
            updatedData.gain = gain.toString(); // Update gain as string
        }

        setFormData(updatedData);

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
            description="Profit from selling a fixed asset at a price higher than its book value."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Gain_PopupContent;
