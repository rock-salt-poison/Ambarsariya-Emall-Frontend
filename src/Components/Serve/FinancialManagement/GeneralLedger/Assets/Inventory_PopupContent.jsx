import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Inventory_PopupContent() {
    const initialData = {
        category: '',
        products: '',
        items: '',
        quantity: 0, 
        price: '',
        date_time: ''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        { id: 1, label: 'Choose Category', name: 'category', type: 'select', options: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'] },
        { id: 2, label: 'Choose Products', name: 'products', type: 'select', options: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'] },
        { id: 3, label: 'Choose Item', name: 'items', type: 'select', options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'] },
        { id: 4, label: 'Quantity', name: 'quantity', type: 'quantity' },  // Quantity field
        { id: 5, label: 'Price', name: 'price', type: 'text', behavior: 'numeric' },
        { id: 6, label: 'Date / Time', name: 'date_time', type: 'datetime-local' },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

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
            cName="inventory"
            description="The value of goods available for sale."
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

export default Inventory_PopupContent;
