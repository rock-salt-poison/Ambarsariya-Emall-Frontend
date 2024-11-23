import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function ContractProcess() {
    const initialData = {
        rotation:'',
        subscription:'',
        limit_or_credit:'',
        advance_amount:'',
        transportaion_charges:'',
        other_overheads:'',
        complete_tax_details:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Set rotation',
            name: 'rotation',
            type: 'select-check',
            options:['Option 1', 'Option 2', 'Option 3', 'Option 4', ],
        },
        {
            id: 2,
            label: 'Set subscription',
            name: 'subscription',
            type: 'text',
        },
        {
            id: 3,
            label: 'Set limit / set credit',
            name: 'limit_or_credit',
            type: 'text',
        },
        {
            id: 4,
            label: 'Advance amount (50% total cost price)',
            name: 'advance_amount',
            type: 'text',   
            behavior:'numeric',
        },
        {
            id: 5,
            label: 'Transportation charges ( weight/ distance / mode / urgency)',
            name: 'transportaion_charges',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 6,
            label: 'Other overheads',
            name: 'other_overheads',
            type: 'text',
        },
        {
            id: 7,
            label: 'complete tax details',
            name: 'complete_tax_details',
            type: 'text',
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

export default ContractProcess