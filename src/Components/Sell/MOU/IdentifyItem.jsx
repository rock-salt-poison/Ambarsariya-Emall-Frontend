import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import SearchIcon from '@mui/icons-material/Search';

function IdentifyItem() {
    const initialData = {
        products:'',
        groups:'',
        vendors:'',
        details_of_vendor:'',
        last_conversation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Search product (s) cum',
            name: 'products',
            type: 'search',
            adornmentValue:<SearchIcon/>
        },
        {
            id: 2,
            label: 'Select group (s)',
            name: 'groups',
            type: 'select-check',
            options:['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5','Group 6', 'Group 7','Group 8','Group 9','Group 10'],
        },
        {
            id: 3,
            label: 'Select vendor(s)',
            name: 'vendors',
            type: 'select-check',
            options:['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4', 'Vendor 5','Vendor 6', 'Vendor 7','Vendor 8','Vendor 9','Vendor 10'],
        },
        {
            id: 4,
            label: 'Show all details of vendor / shop(s)',
            name: 'details_of_vendor',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Last conversation',
            name: 'last_conversation',
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
        submitButtonText="Create Mou"
    />
  )
}

export default IdentifyItem