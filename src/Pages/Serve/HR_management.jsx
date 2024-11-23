import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import HR_management_icon from '../../Utils/images/Serve/emotional/eshop/HR_management_icon.png';
import HR_management_icon2 from '../../Utils/images/Serve/emotional/eshop/HR_management_icon2.png';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';

function HR_management(props) {
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: 'Chain Supply For Sale',
      fields: [
        { 
          name: 'chain_supply_sale_item_or_category', 
          placeholder: 'Item or category', 
          type: 'select', 
          options: ['Electronics', 'Furniture', 'Groceries', 'Clothing'], 
          required: true 
        },
        { 
          name: 'chain_supply_sale_member_for_chain_supply', 
          placeholder: 'Select members for chain supply or create contact', 
          type: 'select',
          options: ['Logistics Team', 'Warehouse Team', 'Procurement Team'], 
          required: true 
        },
        { 
          name: 'chain_supply_sale_contact', 
          placeholder: 'Create a contact', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'chain_supply_sale', 
          placeholder: 'Create a group For Chain Supply For Sale', 
          type: 'text' 
        },
      ],
    },
    {
      name: 'Suppliers For Purchase',
      fields: [
        { 
          name: 'item_or_category', 
          placeholder: 'Item or category', 
          type: 'select', 
          options: ['Raw Materials', 'Office Supplies', 'Industrial Goods'], 
          required: true 
        },
        { 
          name: 'sector_domain_shop_no', 
          placeholder: 'Choose Sector / Domain / Shop No', 
          type: 'select', 
          options: ['Manufacturing', 'Retail', 'Health & Pharma'], 
          required: true 
        },
        { 
          name: 'contact', 
          placeholder: 'Create a contact', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'suppliers_group', 
          placeholder: 'Create a group For Suppliers For Purchase', 
          type: 'text' 
        },
      ],
    },
    {
      name: 'Employees',
      fields: [
        { 
          name: 'group_for_employees', 
          placeholder: 'Create a group For Employees', 
          type: 'text' 
        },
        { 
          name: 'select_employees', 
          placeholder: 'Select employees', 
          type: 'select', 
          options: ['Manager', 'HR', 'Sales', 'Developer', 'Support Staff'], 
          required: true 
        },
        { 
          name: 'attendance', 
          placeholder: 'AUTO / Manual Attendance', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'payments_salaries_other_charges', 
          placeholder: 'Payments / Salaries / Other charges', 
          type: 'text', 
          required: true 
        },
      ],
    },
    {
      name: 'Recruitment',
      fields: [
        { 
          name: 'recruitment', 
          placeholder: 'Create a Recruitment', 
          type: 'text' 
        },
        { 
          name: 'sector_category_and_experience', 
          placeholder: 'Select sector, category and experience', 
          type: 'select', 
          options: ['IT - 3+ years', 'Sales - 5+ years', 'Engineering - 2+ years'], 
          required: true 
        },
        { 
          name: 'create_or_publish_requirement', 
          placeholder: 'Create and Publish your requirement', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'auto_creation', 
          placeholder: 'Auto Creation on portal', 
          type: 'text', 
          required: true 
        },
      ],
    },
    {
      name: 'Performance management',
      fields: [
        { 
          name: 'performance_management', 
          placeholder: 'Performance management', 
          type: 'text' 
        },
        { 
          name: 'attendance_salary_leaves_and_work_quality', 
          placeholder: 'Attendance, Salary, Leaves & Work Quality', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'eshop_performance', 
          placeholder: 'E-shop performance', 
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
      <Box className="hr_management_wrapper">
        <Box className="row">

          <Header 
            icon_1={HR_management_icon} 
            icon_2={HR_management_icon2} 
            title="HR management" 
            icon_1_link='../emotional/eshop/' 
            icon_2_link='https://contacts.google.com/' 
            redirectTo='../emotional/eshop'
          />


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
                  key={idx}
                  name={field.name}
                  type={field.type}
                  value={formData[form.name][field.name]}
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
            <Button2 text="Back" redirectTo='../emotional/eshop/financial-management' />
            <Button2 text="Next" redirectTo='../emotional/eshop/suppliers-for-shop' />
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HR_management;
