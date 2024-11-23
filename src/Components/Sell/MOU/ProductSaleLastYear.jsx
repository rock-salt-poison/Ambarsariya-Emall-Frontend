import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';

function ProductSaleLastYear() {
    const initialData = {
        last_payment_settlements:'',
        last_profit_or_loss:'',
        stock:'',
        date_or_amount:'',
        predictions:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Last payment settlements',
            name: 'last_payment_settlements',
            type: 'text',
        },
        {
            id: 2,
            label: 'Last profit / loss',
            name: 'last_profit_or_loss',
            type: 'text',
        },
        {
            id: 3,
            label: 'In-stock, Out of stock, Reserve Stock',
            name: 'stock',
            type: 'text',
        },
        {
            id: 4,
            label: 'Last Purchase Date/amount',
            name: 'date_or_amount',
            type: 'text',   
            behavior:'numeric',
        },
        {
            id: 5,
            label: 'Call predictions For price and sale',
            name: 'predictions',
            type: 'text',
            behavior:'numeric',
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

export default ProductSaleLastYear