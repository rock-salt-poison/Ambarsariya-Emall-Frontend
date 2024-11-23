import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function InterestExpenses_PopupContent() {
    const initialData = {
        lender:'',
        loan:'',
        amount:'',
        rate_of_interest:'',
        return_as_a_interest:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [customLender, setCustomLender]= useState(false);
    const [availableLoans, setAvailableLoans] = useState([]);

    const formFields = [
        {
            id: 1,
            label: 'Select Lender',
            name: 'lender',
            type: 'select',
            options: ['HDFC Bank', 'SBI (State Bank of India)', 'ICICI Bank', 'Axis Bank', 'Bajaj finance','Other']
        },
        ...customLender ? [{
            id: 2,
            label: 'Other Lender',
            name: 'other_lender',
            type: 'text',
        }]:[],
        {
            id: 3,
            label: 'Select Loan',
            name: 'loan',
            type: 'select',
            options: availableLoans,
        },
        {
            id: 4,
            label: 'Show Amount',
            name: 'amount',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 5,
            label: 'Show rate of interest',
            name: 'rate_of_interest',
            type: 'text',
        },
        {
            id: 6,
            label: 'Total return as a interest',
            name: 'return_as_a_interest',
            type: 'text',
        },
    ];

    const loanOptions={
        'HDFC Bank':['Home Loan','Personal Loan','Car Loan','Education Loan'],
        'SBI (State Bank of India)':['Gold Loan','Business Loan', 'Housing Loan', 'Agricultural Loan'], 
        'ICICI Bank':['Student Loan', 'Vehicle Loan','Home Renovation Loan'], 
        'Axis Bank':['Two-Wheeler Loan', 'Mortgage Loan'],
        'Bajaj Finance':['Loan Against Property','Consumer Durable Loan']
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if(name==='lender'){
            setCustomLender(value==="Other");
            if(loanOptions[value]){
                setAvailableLoans(loanOptions[value])
            }else if(value==="Other"){
                setAvailableLoans(Object.values(loanOptions).flat())
            }
        }

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
        } else {
            console.log(errors);
        }
    };

    return (
        <GeneralLedgerForm
            description="Costs related to any debt financing."
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
    );
}

export default InterestExpenses_PopupContent;
