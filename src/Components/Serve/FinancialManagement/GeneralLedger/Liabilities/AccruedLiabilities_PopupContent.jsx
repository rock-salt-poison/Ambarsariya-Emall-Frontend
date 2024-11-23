import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function AccruedLiabilities_PopupContent() {
    const initialData = {
        group:'',
        employee:'',
        time_period_range:'',
        salary:'',
        advance:'',
        balance:'',
        cut_off:'',
        pay:'',
        total:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Group',
            name: 'group',
            type: 'select',
            options: ['Purchase-Employee']
        },
        {
            id: 2,
            label: 'Select Employee (Name - Department)',
            name: 'employee',
            placeholder:'Name - Department',
            type: 'select',
            options: [
                'John Doe - Finance',
                'Jane Smith - Human Resources',
                'Michael Johnson - IT',
                'Emily Davis - Marketing',
                'Sarah Brown - Sales']
        },
        {
            id: 3,
            label: 'Time Period',
            name: 'time_period_range',
            type: 'daterange',
        },
        {
            id: 4,
            label: 'Salary',
            name: 'salary',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 5,
            label: 'Advance',
            name: 'advance',
            type: 'text',
            behavior:'numeric'
        },  // Quantity field
        {
            id: 6,
            label: 'Balance',
            name: 'balance',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 7,
            label: 'Cut-offs',
            name: 'cut_off',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 8,
            label: 'Pay',
            name: 'pay',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 9,
            label: 'Total',
            name: 'total',
            type: 'number',
            readOnly:true,
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
                description="Expenses that have been incurred but not yet paid (e.g., wages, taxes)."
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

export default AccruedLiabilities_PopupContent;
