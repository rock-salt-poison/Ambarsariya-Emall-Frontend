import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function ContactInformation_PopupContent() {

    const initialData = {
        supplier_name:'M.K Hotels & Resorts',
        address:'45,46 B-Ranjit avenue Opp Khalsa College',
        phone_number_1:'+91 97817 71170',
        phone_number_2:'+91 83601 56580',
        email:'Kitty@yahoo.mail.com',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Supplier Name',
            name: 'supplier_name',
            type: 'text',
            readOnly:true,
        },
        {
            id: 2,
            label: 'Address',
            name: 'address',
            type: 'text',
            readOnly:true,
        },
        {
            id: 3,
            label: 'Phone Number 1',
            name: 'phone_number_1',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 4,
            label: 'Phone Number 2',
            name: 'phone_number_2',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 5,
            label: 'Email',
            name: 'email',
            type: 'email',
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
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={false}
        />
    );
}

export default ContactInformation_PopupContent;
