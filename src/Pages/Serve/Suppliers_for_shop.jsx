import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Typography, Tooltip } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import suppliers_for_shop_icon from '../../Utils/images/Serve/emotional/eshop/suppliers_for_shop_icon.webp';
import financial_management_icon2 from '../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';

function Suppliers_for_shop(props) {
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: 'Employees',
      fields: [
        { 
          name: 'group_for_employees', 
          placeholder: 'Choose a group or employee', 
          type: 'select', 
          options: ['Admin', 'Sales', 'HR', 'IT', 'Marketing'] 
        },
        { 
          name: 'stock_inventory', 
          value: 'AUTO / Manual Stock Inventory', 
          type: 'button', 
          required: true 
        },
        { 
          name: 'product_info', 
          placeholder: 'SKU, MFG & EXP DATE, Product CSV Sheet', 
          type: 'file', 
          required: true 
        },
      ],
    },
    {
      name: 'Suppliers For Purchase',
      fields: [
        { 
          name: 'select_items', 
          placeholder: 'Select items', 
          type: 'select',
          options: ['Raw Materials', 'Packaging', 'Electronics', 'Office Supplies'] 
        },
        { 
          name: 'suppliers_group', 
          placeholder: 'Select group For Suppliers For Purchase', 
          type: 'select',
          options: ['Local Suppliers', 'International Suppliers', 'Preferred Vendors', 'Certified Suppliers'] 
        },
        { 
          name: 'purchase_info', 
          placeholder: 'Procurement & Purchase order, MOU, Credits', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'stock_level', 
          placeholder: 'AUTO / Manual Stock Level', 
          type: 'text', 
          required: true 
        },
      ],
    },
    {
      name: 'stock_inventory',
      fields: [
        { 
          name: 'select_item', 
          placeholder: 'Select Item / Category', 
          type: 'select',
          options: ['Electronics', 'Furniture', 'Groceries', 'Apparel'] 
        },
        { 
          name: 'stock_inventory', 
          placeholder: 'AUTO / Manual Stock Inventory', 
          type: 'text' 
        },
        { 
          name: 'sale_stock_overload', 
          placeholder: 'SALE Stock overload', 
          type: 'date', 
          required: true 
        },
        { 
          name: 'selling_price', 
          placeholder: 'Selling Price (INR)', 
          type: 'text', 
          required: true 
        },
      ],
    },
    {
      name: 'planning_and_forecasting',
      fields: [
        { 
          name: 'planning_and_forecasting', 
          placeholder: 'Demand Planning & Forecasting', 
          type: 'text' 
        },
        { 
          name: 'analyze_historical_data', 
          placeholder: 'Analyzes historical data and market trends', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'campaign_and_price_calculator', 
          placeholder: 'Campaign & Price Calculator', 
          type: 'text', 
          required: true 
        },
      ],
    },
  ];
  

  const initialFormData = formsConfig.reduce((acc, form) => {
    acc[form.name] = form.fields.reduce((fieldAcc, field) => {
      fieldAcc[field.name] = '';
      return fieldAcc;
    }, {});
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e, formName) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [name]: value,
      },
    }));
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [formName]: {
        ...prevErrors[formName],
        [name]: '',
      },
    }));
  };

  const validateForm = (formName) => {
    const newErrors = {};
    const formConfig = formsConfig.find((form) => form.name === formName);

    formConfig.fields.forEach((field) => {
      if (field.required && !formData[formName][field.name]) {
        newErrors[field.name] = `${field.placeholder} is required`;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e, formName) => {
    e.preventDefault();
    const validationErrors = validateForm(formName);
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [formName]: validationErrors,
      }));
    } else {
      console.log(`${formName} data:`, formData[formName]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="suppliers_for_shop_wrapper">
        <Box className="row">

          <Header icon_1={suppliers_for_shop_icon} icon_2={financial_management_icon2} title="Suppliers For Shop" icon_1_link='../emotional/eshop/suppliers-for-shop2' icon_2_link='../emotional/eshop'  redirectTo='../emotional/eshop'/>

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <Typography className='form_heading' variant='h3'>{form.name}</Typography>
                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, form.name)}>
                    {form.fields.map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box>
                          <FormField
                            name={field.name}
                            type={field.type}
                            value={field.value? field.value : formData[form.name][field.name]}
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="btn">Submit</Button>
                    </Box>
                  </Box>
                </Box>
              ))}

            </Box>
          </Box>

          <Box className="col">
            <Button2 text="Back" redirectTo='../emotional/eshop/hr-management/' />
            <Button2 text="Next" redirectTo='../emotional/eshop/supply-chain-sale-order' />
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Suppliers_for_shop;
