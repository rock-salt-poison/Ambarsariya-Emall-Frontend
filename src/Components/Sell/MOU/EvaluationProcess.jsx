import React, { useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import { Box, Typography } from '@mui/material';

function EvaluationProcess() {
    const initialData = {
        final_price: '',
        consult_price_book: '',
        transportation_charges: '',
        other_overhead_charges: '',
        margins: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});


    const formFields = [
        {
            id: 1,
            label: 'Final price',
            name: 'final_price',
            type: 'text',
            title:'final price'
        },
        {
            id: 2,
            label: 'Consult price book',
            name: 'consult_price_book',
            type: 'text',
        },
        {
            id: 3,
            label: 'Transportation charges',
            name: 'transportation_charges',
            type: 'text',
        },
        {
            id: 4,
            label: 'Other overhead charges',
            name: 'other_overhead_charges',
            type: 'text',
            behavior: 'numeric',
        },
        {
            id: 5,
            label: 'Set margins',
            name: 'margins',
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

    const terms = [
        {id:1, title:'Subscription', description:'Recurring payment for ongoing access'},
        {id:2, title:'Min Quantity', description:'Minimum items per order'},
        {id:3, title:'Min Orders', description:'Minimum number of required orders'},
        {id:4, title:'Total calculated amount', description:'Final sum of all costs'},
        {id:5, title:'50% of the total amount for the period', description:'Half of the total payable for the specified time'},
        {id:6, title:'Credit terms', description:'Payment conditions allowing deferred payment'},
        {id:7, title:'Subscription mou cost 500', description:'Agreement fee for the subscription is Rs. 500'},
    ]

    return (
        <>
            <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
                submitBtnVisibility={false}
            />
            <Box className="terms">
                <Typography className="terms_heading">
                    Some Important Terms
                </Typography>
                <Box className="terms_container">
                    {terms.map((term)=>{
                        return  <Box className="term" key={term.id}>
                        <Typography className="title">
                            {term.title} :-
                            <Typography className="description" variant="span">{term.description}</Typography>
                        </Typography>
                        
                    </Box>
                    })}
                   
                </Box>
            </Box>
        </>
    )
}

export default EvaluationProcess