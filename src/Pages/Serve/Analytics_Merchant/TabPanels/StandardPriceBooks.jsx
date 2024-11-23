import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import SearchIcon from '@mui/icons-material/Search';

function StandardPriceBooks() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        searched_product:'',
        price:'',
        margins:'',
        delivery_for_po:'',
        overheads:'',
        cost_price:'',
        gst:'',
        selling_price:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const formFields = [
        {
            id: 1,
            label: 'Search product with id',
            name: 'searched_product',
            placeholder:'Search...',
            type: 'search',
            adornmentValue:<SearchIcon/>
        },
        {
            id: 2,
            label: 'Price',
            name: 'price',
            type: 'text',
        },
        {
            id: 3,
            label: 'Margins',
            name: 'margin',
            type: 'text',
        },
        {
            id: 4,
            label: 'Delivery for p.o',
            name: 'delivery_for_po',
            type: 'text',
        },
        {
            id: 5,
            label: 'Overheads',
            name: 'overheads',
            type: 'text',
        },
        {
            id: 6,
            label: 'Cost Price',
            name: 'cost_price',
            type: 'text',
        },
        {
            id: 7,
            label: 'GST',
            name: 'gst',
            type: 'text',
        },
        {
            id: 8,
            label: 'Selling Price',
            name: 'selling_price',
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
        <ThemeProvider theme={theme}>
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={false}
        />
        </ThemeProvider>
    );
}



export default StandardPriceBooks;
