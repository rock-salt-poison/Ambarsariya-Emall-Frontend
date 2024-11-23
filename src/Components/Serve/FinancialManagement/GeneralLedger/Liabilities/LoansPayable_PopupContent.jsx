import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function LoansPayable_PopupContent() {
    const initialData = {
        lender: '',
        created_lender_contact: '',
        category: '',
        purpose: '',
        loan_amount: '',
        loan_datetime: '',
        balance_amount: 0,
        return: [{ amount: '', datetime: '' }] // Start with one return entry
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [showContactField, setShowContactField] = useState(false);

    // Form fields configuration
    const formFields = [
        {
            id: 1,
            label: 'Select Lender or Create',
            name: 'lender',
            type: 'select',
            options: ['Create', 'Lender_001', 'Lender_002', 'Lender_003', 'Lender_004']
        },
        ...(showContactField
            ? [{
                  id: 2,
                  label: 'Create Contact',
                  name: 'created_lender_contact',
                  type: 'text'
              }]
            : []),
        {
            id: 3,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: ['Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        {
            id: 4,
            label: 'Select Purpose or Create',
            name: 'purpose',
            type: 'select',
            options: ['Purpose 1', 'Purpose 2', 'Purpose 3', 'Purpose 4', 'Purpose 5']
        },
        {
            id: 5,
            label: 'Enter Loan Amount',
            name: 'loan_amount',
            type: 'text',
            behavior: 'numeric'
        },
        {
            id: 6,
            label: 'Date / Time',
            name: 'loan_datetime',
            type: 'datetime-local'
        },
        ...formData.return.map((_, index) => [
            {
                id: `return_amount_${index}`,
                label: `Enter Return Amount`,
                name: `return_${index}_amount`,
                type: 'text',
                behavior: 'numeric'
            },
            {
                id: `return_datetime_${index}`,
                label: `Return Date / Time`,
                name: `return_${index}_datetime`,
                type: 'datetime-local',
                addMoreButton:true
            }
        ]).flat(),
        {
            id: 10,
            label: 'Balance',
            name: 'balance_amount',
            type: 'number', 
        }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith('return_')) {
            const [_, index, field] = name.split('_');
            const updatedReturns = [...formData.return];
            updatedReturns[parseInt(index)][field] = value;
            setFormData({ ...formData, return: updatedReturns });
        } else {
            setFormData({ ...formData, [name]: value });

            if (name === 'lender') {
                setShowContactField(value === 'Create');
            }
        }

        setErrors({ ...errors, [name]: null });
    };

    const addReturnField = (e) => {
        e.target.remove();
        setFormData({
            ...formData,
            return: [...formData.return, { amount: '', datetime: '' }]
        });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach((field) => {
            const name = field.name;
            if (name.startsWith('return_')) {
                const [_, index, fieldName] = name.split('_');
                if (!formData.return[parseInt(index)][fieldName]) {
                    newErrors[name] = `${field.label} is required.`;
                }
            } else if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log(formData);
            // Submit the form
        } else {
            console.log(errors);
        }
    };


    return (
            <GeneralLedgerForm
                cName="loans_payable"
                description="Outstanding loans or other forms of debt."
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
                handleAddMore={addReturnField}
            />
    );
}

export default LoansPayable_PopupContent;
