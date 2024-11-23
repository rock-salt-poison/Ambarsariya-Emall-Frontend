import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function RetainedEarnings_PopupContent() {
    const initialData = {
        equity_owner:'',
        equity_share:'',
        time_period_range:'',
        total_profit:'',
        share_profit:'',
        re_invested_share:'',
        total_share_invested:'',
        total_revenue:'',
        total_withdrawn_profit:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Equity Owner',
            name: 'equity_owner',
            type: 'select',
            options: ['Owner-1', 'Owner-2']
        },
        {
            id: 2,
            label: 'Equity Share',
            name: 'equity_share',
            type: 'text',
        },
        {
            id: 3,
            label: 'Select Time Period',
            name: 'time_period_range',
            type: 'daterange',
        },
        {
            id: 4,
            label: 'Total Profit',
            name: 'total_profit',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 5,
            label: 'Share Profit',
            name: 'share_profit',
            type: 'text',
            behavior:'numeric'
        },  // Quantity field
        {
            id: 6,
            label: 'Re-invested Share',
            name: 're_invested_share',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 7,
            label: 'Total Share invested',
            name: 'total_share_invested',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 8,
            label: 'Total Revenue',
            name: 'total_revenue',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 9,
            label: 'Total Withdrawn Profit',
            name: 'total_withdrawn_profit',
            type: 'text',
            behavior:'numeric'
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });        

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    // Handle Increment/Decrement for Quantity
    const handleIncrement = () => {
        setFormData(prevState => ({ ...prevState, quantity: parseInt(prevState.quantity) + 1 }));
    };

    const handleDecrement = () => {
        setFormData(prevState => {
            const newQuantity = parseInt(prevState.quantity) - 1;
            return { ...prevState, quantity: newQuantity >= 0 ? newQuantity : 0 }; // Prevent negative quantity
        });
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
                cName="accrued_liabilities"
                description="Profits that have been reinvested in the business rather than distributed to owners."
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
    );
}

export default RetainedEarnings_PopupContent;
