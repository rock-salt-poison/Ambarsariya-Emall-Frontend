import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function SigningMou() {
    const initialData = {
        rank:'',
        description:'',
        half_payment:'',
        credit_assigns:'',
        purchase_sale_party_details:'',
        purchaser_phone_number:'',
        purchaser_otp:'',
        seller_phone_number:'',
        seller_otp:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Select Ranks',
            name: 'rank',
            type: 'select',
            options:['Rank 1', 'Rank 2','Rank 3'],
        },
        {
            id: 2,
            label: 'Description of Mou',
            name: 'description',
            type: 'textarea',
        },
        {
            id: 3,
            label: '50% of the payment',
            name: 'half_payment',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 4,
            label: 'Credit Assigns',
            name: 'credit_assigns',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Purchase and sale party details',
            name: 'purchase_sale_party_details',
            type: 'text',
        },
        {
            id: 6,
            label: 'Purchaser Phone number',
            name: 'purchaser_phone_number',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 7,
            label: 'Enter OTP',
            name: 'purchaser_otp',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 8,
            label: 'Seller Phone number',
            name: 'seller_phone_number',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 9,
            label: 'Enter OTP',
            name: 'seller_otp',
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
  )
}

export default SigningMou