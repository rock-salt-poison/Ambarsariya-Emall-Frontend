import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';

function CustomerRecords(props) {
  const initialData = {
    purchase_date:'',
    customer:'',
    customer_details:'',
    completed_orders:'',
    pending_orders:'',
    subscription_details:'',
    edit_customer_details:'',
};

const [formData, setFormData] = useState(initialData);
const [errors, setErrors] = useState({});
const handleClick = () => {
  console.log("hi")
}

const formFields = [
    {
        id: 1,
        label: 'Purchase Date',
        name: 'purchase_date',
        type: 'daterange',
    },
    {
        id: 2,
        label: 'Select Customer',
        name: 'customer',
        type: 'select',
        options:['Customer 1', 'Customer 2','Customer 3','Customer 4'],
    },
    {
        id: 3,
        label: 'Customer Details',
        name: 'customer_details',
        type: 'textarea',
        readOnly:true,
    },
    {
        id: 4,
        label: 'Completed Orders',
        name: 'completed_orders',
        type: 'text',   
        readOnly:true
    },
    {
        id: 5,
        label: 'Pending Orders',
        name: 'pending_orders',
        type: 'text',
        readOnly:true,
    },
    {
      id: 6,
      label: 'Subscription Details',
      name: 'subscription_details',
      type: 'text',
      readOnly:true,
    },
    {
      id: 7,
      label: 'Edit Customer Details',
      value: 'Edit Customer Details',
      name: 'edit_customer_details',
      type: 'button',
      handleButtonClick : handleClick
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

const themeProps = {
  popoverBackgroundColor: 'var(--yellow)',
  scrollbarThumb: 'var(--brown)',
};

const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <Box className="crm_sub_wrapper">
        <Box className="row">
        <Header back_btn_link='../emotional/crm' next_btn_link="../emotional/crm/member-group-creation" heading_with_bg={true} title="Customer Records" redirectTo='../emotional/crm' />


          <Box className="col">
            <Box className="container">
                <Box className="col-3">
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <GeneralLedgerForm
                      formfields={formFields}
                      handleSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                      errors={errors}
                      submitButtonText="Show purchase history"
                  />
                  
                </Box>

              <Box className="sub_container">
                { 
                <Box className="show_message">
                  <Typography className='blank'>
                      Please fill the form first to see the purchase history.
                  </Typography>  
                </Box>
                }
                
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CustomerRecords;
