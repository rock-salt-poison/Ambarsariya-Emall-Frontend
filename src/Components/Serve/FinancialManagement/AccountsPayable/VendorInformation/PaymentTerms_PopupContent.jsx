import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function PaymentTerms_PopupContent() {

    const initialData = {
        credit_limit:'158799',
        advance_amount:'1099',
        delivery_charges:'69',
        discounts:'359',
        total_amount:'5469',
        show_balance:'2649',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Credit Limit',
            name: 'credit_limit',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
        },
        {
            id: 2,
            label: 'Advance amount',
            name: 'advance_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
        },
        {
            id: 3,
            label: 'Delivery Charges',
            name: 'delivery_charges',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
        },
        {
            id: 4,
           label: 'Discounts',
            name: 'discounts',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
        },
        {
            id: 5,
            label: 'Total Amount',
            name: 'total_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
        },
        {
            id: 6,
            label: 'Show Balance',
            name: 'show_balance',
            type: 'text',
            behavior:'numeric',
            readOnly:true,
            adornmentValue:'Rs'
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
            submitBtnVisibility={false}
        />
    );
}

export default PaymentTerms_PopupContent;
