import React, { useState } from "react";
import GeneralLedgerForm from "../../../../Form/GeneralLedgerForm";

function Sales_PopupContent() {
    const initialData = {
        category:'',
        products:'',
        date_time:'',
        sale:'',
        credit_or_cash_received:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: ['Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        {
            id: 2,
            label: 'Select Products',
            name: 'products',
            type: 'select',
            options: ['Pain Relief', 'Antibiotics', 'Multivitamins', 'Omega-3', 'Surgical Instruments']
        },
        {
            id: 3,
            label: "Date/Time",
            name: "date_time",
            type: "daterange"
        },
        {
            id: 4,
            label: "Total Sale",
            name: "sale",
            type: "text"
        },
        {
            id: 5,
            label: "Total Credit / Cash received",
            name: "credit_or_cash_received",
            type: "text",
            behavior: "numeric",
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

export default Sales_PopupContent;
