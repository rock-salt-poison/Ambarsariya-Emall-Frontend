import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function AccountsPayable_PopupContent() {
    const initialData = {
        shopNo: '',
        created_contact: '',
        category: '',
        products: '',
        items: '',
        quantity: 0,
        no_of_items:'',
        cost:'0',
        advance_payment:'',
        balance_amount:'0',
        date_time:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [showContactField, setShowContactField] = useState(false);

    const formFields = [
        {
            id: 1,
            label: 'Select Shop No Or Create Contact',
            name: 'shopNo',
            type: 'select',
            options: ['Create Contact', 'Shop_001', 'Shop_002', 'Shop_003', 'Shop_004']
        },

        ...(showContactField ? [{
            id: 2,
            label: 'Create Contact',
            name: 'created_contact',
            type: 'text', // Adjust the type based on your requirements
        }] : []),
        {
            id: 3,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: ['Medicine', 'Supplements', 'Personal Care', 'First Aid and Emergency Care']
        },
        {
            id: 4,
            label: 'Select Products',
            name: 'products',
            type: 'select',
            options: ['Pain Relief', 'Antibiotics', 'Multivitamins', 'Omega-3', 'Surgical Instruments']
        },
        {
            id: 5,
            label: 'Select Item',
            name: 'items',
            type: 'select',
            options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
        },
        {
            id: 6,
            label: 'Select No. of quantity',
            name: 'quantity',
            type: 'quantity'
        },  // Quantity field
        {
            id: 7,
            label: 'Total no. items',
            name: 'no_of_items',
            type: 'number',
        },
        {
            id: 8,
            label: 'Total cost',
            name: 'cost',
            type: 'number',
            readOnly:true,
        },
        {
            id: 9,
            label: 'Advance Payment',
            name: 'advance_payment',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 10,
            label: 'Balance',
            name: 'balance_amount',
            type: 'number',
            readOnly:true,
        },
        {
            id: 11,
            label: 'Date / Time',
            name: 'date_time',
            type: 'datetime-local'
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'shopNo') {
            setShowContactField(value === 'Create Contact'); // Show contact field if "Create Contact" is selected
        }
        

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
                cName="accounts_payable"
                description="Amounts the store owes to suppliers and vendors."
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

export default AccountsPayable_PopupContent;
