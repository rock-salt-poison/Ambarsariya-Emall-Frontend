import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function Depreciation_PopupContent() {
    const initialData = {
        fixed_assets:'',
        repair_or_change:'',
        cost:'',
        date_time:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Fixed Assets',
            name: 'fixed_assets',
            type: 'select',
            options: ['Building', 'Machinery', 'Vehicles', 'Furniture and Fixtures', 'Computer Equipment','Land']
        },
        {
            id: 2,
            label: 'Select Repair/Change',
            name: 'repair_or_change',
            type: 'select',
            options: ['Repair', 'Change']
        },
        {
            id: 3,
            label: 'Cost',
            name: 'cost',
            type: 'text',
            behavior:'numeric',
        },
        {
            id: 4,
            label: 'Date / Time',
            name: 'date_time',
            type: 'daterange',
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
            description="The gradual write-off of the cost of fixed assets over their useful life."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default Depreciation_PopupContent;
