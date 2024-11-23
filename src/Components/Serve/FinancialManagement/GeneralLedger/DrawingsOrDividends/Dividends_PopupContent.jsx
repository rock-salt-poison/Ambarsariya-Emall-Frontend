import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Dividends_PopupContent() {
    const initialData = {
        equity_owner:'',
        dividend_power:'',
        time_period:'',
        dividend:'',
        withdraw_dividend:'',
        balance_investment:'',
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
            label: 'Create Dividend Power',
            name: 'dividend_power',
            type: 'text',
        },
        {
            id: 3,
            label: 'Select Time Period',
            name: 'time_period',
            type: 'daterange',
            behavior:'numeric',
        },
        {
            id: 4,
            label: 'Select Dividend',
            name: 'dividend',
            type: 'select',
            options:['Regular Dividend']
        },
        {
            id:5,
            label:'Withdraw Dividend',
            name:'withdraw_dividend',
            type:'text',
            behavior:'numeric',
        },
        {
            id:6,
            label:'Balance Investment',
            name:'balance_investment',
            type:'text',
            behavior:'numeric',
        }
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
            description="Profits distributed to shareholders (in the case of corporations)."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Dividends_PopupContent;
