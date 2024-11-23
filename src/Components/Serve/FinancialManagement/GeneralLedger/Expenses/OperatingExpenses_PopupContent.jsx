import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function OperatingExpenses_PopupContent() {
    const initialData = {
        service:'',
        services:'',
        date_time:'',
        expenditure_on_service:'',
        expenditure_on_all_services:'',
        other_amount:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Service',
            name: 'service',
            type: 'select',
            options: ['Rent', 'Utilities', 'Salaries', 'Campaign', 'E-Banners','E-Shop']
        },
        {
            id: 2,
            label: 'Select Services',
            name: 'services',
            type: 'select',
            options: ['Delivery', 'Subscription', 'Postpaid', 'Daily Wages', 'Daily Maintenance']
        },
        {
            id: 3,
            label: 'Date / Time',
            name: 'date_time',
            type: 'daterange'
        },
        {
            id: 4,
            label: 'Total Expenditure on service',
            name: 'expenditure_on_service',
            type: 'text',
        },
        {
            id: 5,
            label: 'Total Expenditure on all services',
            name: 'expenditure_on_all_services',
            type: 'text',
        },
        {
            id: 6,
            label: 'Enter Others Amount',
            name: 'other_amount',
            type: 'text',
            behavior: 'numeric',
            placeholder:'Rs 000000.00',
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
            description="Ongoing expenses such as Rent, Utilities, Salaries, Advertising and Maintenance."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default OperatingExpenses_PopupContent;
