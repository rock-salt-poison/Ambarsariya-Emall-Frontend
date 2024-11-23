import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';

function SalesPipeline(props) {
  const initialData = {
    date:'',
    subscriptions:'',
    completed_orders:'',
    completed_orders_date:'',
    pending_orders:'',
    pending_orders_date:'',
    cancel_and_re_order:'',
    cancel_re_order_date:'',
    subscription_date:'',
    renew_triggering:'',
};

const [formData, setFormData] = useState(initialData);
const [errors, setErrors] = useState({});

const handleClick = () => {
  console.log("hi")
}

const formFields = [
    {
        id: 1,
        label: 'Select Date',
        name: 'date',
        type: 'daterange',
    },
    {
        id: 2,
        label: 'Select subscription (s)',
        name: 'subscriptions',
        type: 'select-check',
        options:['Subscription 1', 'Subscription 2','Subscription 3','Subscription 4'],
    },
    {
      id: 3,
      label: 'Completed Orders',
      name: 'completed_orders',
      type: 'text',   
      readOnly:true
    },
    {
        id: 4,
        label: 'Completed Orders Date',
        name: 'completed_orders_date',
        type: 'daterange',
        readOnly:true,
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
        label: 'Pending orders Date',
        name: 'pending_orders_date',
        type: 'daterange',
        readOnly:true,
    },
    {
        id: 7,
        label: 'Cancel and re-order',
        name: 'cancel_and_re_order',
        type: 'text',
        readOnly:true,
    },
    {
        id: 8,
        label: 'Cancel and re-order Date',
        name: 'cancel_re_order_date',
        type: 'daterange',
        readOnly:true,
    },
    {
        id: 9,
        label: 'Subscription Date',
        name: 'subscription_date',
        type: 'daterange',
        readOnly:true,
    },
    {
        id: 10,
        label: 'Renew Triggering',
        value: 'Renew Triggering',
        name: 'renew_triggering',
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
        <Header back_btn_link='../emotional/crm/member-group-creation' next_btn_link="../emotional/crm/marketing-campaigns" heading_with_bg={true} title="Sales Pipeline" redirectTo='../emotional/crm' />

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
                      submitButtonText="Show Members"
                  />
                  
                </Box>

              <Box className="sub_container">
                { 
                <Box className="show_message">
                  <Typography className='blank'>
                      Sales Pipeline data
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

export default SalesPipeline;
