import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function OwnersEquity_PopupContent() {
    const initialData = {
        shop_no:'',
        shop_details:'',
        point_of_contact:'',
        member_no:'',
        member_name:'',
        equity_owner:'',
        total_investment_amount:'',
        date:'',
        investment_percent:'50',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Shop No.',
            name: 'shop_no',
            type: 'text',
            placeholder:'Example: Shop_00001'
        },
        {
            id: 2,
            label: 'Shop Details',
            name: 'shop_details',
            type: 'text',
            readOnly:true
        },
        {
            id: 3,
            label: 'Point of contact',
            name: 'point_of_contact',
            type: 'text',
            readOnly:true
        },
        {
            id: 4,
            label: 'Member No.',
            name: 'member_no',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 5,
            label: 'Member Name',
            name: 'member_name',
            type: 'text',
            readOnly:true
        },  
        {
            id: 6,
            label: 'Name of Equity Owner',
            name: 'equity_owner',
            type: 'text',
            placeholder:'Equity Owner'
        },
        {
            id: 7,
            label: 'Total investment amount',
            name: 'total_investment_amount',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 8,
            label: 'Select Date',
            name: 'date',
            type: 'date',
        },
        {
            id: 9,
            label: 'Equity Share',
            name: 'equity_owner',
            type: 'type',
            readOnly:true,
        },
        {
            id: 10,
            label: 'Total investment percent',
            name: 'investment_percent',
            type: 'type',
            behavior:'numeric',
            readOnly:true,
        }
    ];

    const shopDetailsData = {
        'shop_00001':{
            shop_details: 'Details of Shop 1',
            point_of_contact: 'john.doe@example.com',
            member_no: 'MEM00045',
            member_name: 'John doe',
            investment_percent: '70',
        },
        'shop_00002':{
            shop_details: 'Details of Shop 2',
            point_of_contact: 'emily@example.com',
            member_no: 'MEM00045',
            member_name: 'Emily',
            investment_percent: '40',
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });        

        if(name==='shop_no'){
            const details = shopDetailsData[value];
            if(shopDetailsData[value]){
                setFormData((prevData)=>({...prevData, ...details}));
            }else{
                setFormData((prevData)=>({...prevData,
                    shop_details: '',
                    point_of_contact: '',
                    member_no: '',
                    member_name: '',
                    investment_percent: '',
                }));
        }
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
                cName="owners_equity"
                description="The owner's investment in the business."
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

export default OwnersEquity_PopupContent;
