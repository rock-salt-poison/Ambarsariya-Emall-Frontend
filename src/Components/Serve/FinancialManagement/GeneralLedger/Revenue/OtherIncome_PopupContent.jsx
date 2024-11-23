import React, { useState } from "react";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";

function OtherIncome_PopupContent() {
    const initialData = {
        sources:'',
        created_source:'',
        date_time:'',
        credit_or_cash_received:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [createSourcesField, setCreateSourcesField] =  useState(false);

    const formFields = [
        {
            id: 1,
            label: 'Create or Select Sources',
            name: 'sources',
            type: 'select',
            options: ['Create', 'Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        ...createSourcesField ? [{
            id: 1,
            label: 'Create Source',
            name: 'created_source',
            type: 'text',
        }]:[],
        {
            id: 3,
            label: "Date/Time",
            name: "date_time",
            type: "daterange"
        },
        {
            id: 4,
            label: "Total Cash received or given credit",
            name: "credit_or_cash_received",
            type: "text",
            behavior: "numeric",
        },
        
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if(name==='sources'){
            setCreateSourcesField(value==="Create")
        }

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};
        formFields.forEach((field) => {
            const name = field.name;
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
        }
    };

    return (
        <GeneralLedgerForm
            cName="sale"
            description="Income from the sale of goods, both cash and credit sales."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default OtherIncome_PopupContent;
