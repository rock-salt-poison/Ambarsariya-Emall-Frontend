import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';

function MemberGroupCreation(props) {
  const initialData = {
    products:'',
    merchant:'',
    created_vendor :'',
    customer_details:'',
    completed_orders:'0',
    pending_orders:'0',
    subscription_details:'-',
    edit_merchant_details:'',
};

const [showContactField, setShowContactField] = useState(false);
const [formData, setFormData] = useState(initialData);
const [errors, setErrors] = useState({});
const handleClick = () => {
  console.log("hi")
}

const formFields = [
    {
        id: 1,
        label: 'Select Products',
        name: 'products',
        type: 'select-check',
        options:["Pain Relief",
            "Antibiotics",
            "Multivitamins",
            "Omega-3",
            "Surgical Instruments",
            "Skin Care",
            "Emergency Kits",],
    },
    {
        id: 2,
        label: 'Select Merchant / Create Vendor',
        name: 'merchant',
        type: 'select',
        options:['Merchant 1', 'Merchant 2','Merchant 3','Merchant 4', 'Create Vendor'],
    },
    ...(showContactField ? [{
      id: 3,
      label: 'Create Vendor',
      name: 'created_vendor',
      type: 'text', // Adjust the type based on your requirements
  }] : []),

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
      label: 'Edit Merchant or Vendor Details',
      value: 'Click here to edit merchant/vendor details',
      name: 'edit_merchant_details',
      type: 'button',
      handleButtonClick : handleClick
    },
];



const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'merchant') {
      setShowContactField(value === 'Create Vendor'); // Show contact field if "Create Contact" is selected
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
        <Header back_btn_link='../emotional/crm/customer-records' next_btn_link="../emotional/crm/sales-pipeline" heading_with_bg={true} title="Member Group Creation" redirectTo='../emotional/crm' />

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
                      Purchase history
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

export default MemberGroupCreation;
