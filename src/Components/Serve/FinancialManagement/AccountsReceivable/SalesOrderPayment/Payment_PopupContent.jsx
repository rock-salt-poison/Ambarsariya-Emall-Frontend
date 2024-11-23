import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Payment_PopupContent() {
    const initialData = {
        payment_date:'',
        payment_method:'',
        payment_ref_no:'',
        payment_status:'',
        partial_payments:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Payment Date ',
            name: 'payment_date',
            type: 'date',
            readOnly:true,
        },
        {
            id: 2,
            label: 'Payment Method',
            name: 'payment_method',
            type: 'text',
            readOnly:true,
        },
        {
            id: 3,
            label: 'Payment Reference No. ',
            name: 'payment_ref_no',
            type: 'text',
            readOnly:true,
        },
        {
            id: 4,
            label: 'Payment Status',
            name: 'payment_status',
            type: 'text',
            readOnly:true,
        },
        {
            id: 5,
            label: 'Partial Payments ',
            name: 'partial_payments',
            type: 'text',
            readOnly:true,
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

export default Payment_PopupContent