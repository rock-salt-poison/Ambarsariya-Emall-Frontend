import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function FixedAssets_PopupContent() {
    const initialData = {
      length:'',
      breadth:'',
      height:'',
      sku_rack_number:'',
      sku_shelf_number:'',
      fixed_assets_type:'',
      fixed_assets_size:'',
      fixed_assets_condition:'',
      fixed_assets_cost:'',
      fixed_assets_purchased_date:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        { id: 1, label: 'Enter Shop / Store / Hawker', innerField: [
          { id: 1, label: 'Length', name: 'length', type: 'text', behavior:'numeric' },
          { id: 2, label: 'Breadth', name: 'breadth', type: 'text', behavior:'numeric' },
          { id: 3, label: 'Height', name: 'height', type: 'text', behavior:'numeric' },
      ] },
        { id: 2, label: 'SKU Rack Number', name: 'sku_rack_number', type: 'text' },
        { id: 3, label: 'SKU Shelf Number', name: 'sku_shelf_number', type: 'text' },
        {
          id: 4, label: 'Store Fixed Assets', innerField: [
              { id: 1, label: 'Create type', name: 'fixed_assets_type', type: 'text' },
              { id: 2, label: 'Size', name: 'fixed_assets_size', type: 'text'},
              { id: 3, label: 'Select Condition', name: 'fixed_assets_condition', type: 'select', options:['New', 'Working','Not Working', 'Change Required', 'Old', 'Create']},
              { id: 4, label: 'Cost', name: 'fixed_assets_cost', type: 'text'},
              { id: 5, label: 'Purchased Date', name: 'fixed_assets_purchased_date', type: 'date'},
          ]
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
            if (!field.innerField && !formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
            // Validate inner fields if present
            if (field.innerField) {
                field.innerField.forEach(inner => {
                    const innerName = inner.name;
                    if (!formData[innerName]) {
                        newErrors[innerName] = `${inner.label} is required.`;
                    }
                });
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
            cName="fixed_assets"
            description="Long-term assets such as store equipment, furniture, and property."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default FixedAssets_PopupContent