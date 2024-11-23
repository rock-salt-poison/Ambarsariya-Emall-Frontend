import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import suppliers_for_shop_icon from '../../Utils/images/Serve/emotional/eshop/suppliers_for_shop_icon.webp';
import financial_management_icon2 from '../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';

function Suppliers_for_shop2(props) {
  const [barChartData, setBarChartData] = useState([]); // Manage state for date range visibility
  const [stock_count, set_stock_count] = useState(10);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: 'Employees',
      fields: [
        { name: 'selected_item', label: 'Select item', placeholder:'Select item', type: 'select', options:  ['Laptop', 'Office Chair', 'Printer', 'Stationery'], required:true },

        { name: 'selected_group_for_item', label: 'Select group for item', placeholder: 'Select group for item', type: 'select', options: ['Office Supplies', 'Electronics', 'Furniture', 'IT Equipment'],  required: true },

        { name: 'selected_supplier_for_item', label: 'Select supplier for item', placeholder: 'Select supplier for item', type: 'select', options:['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D'], required: true },

        { name: 'price_book', label: 'Price Book (INR)', placeholder: 'Price Book (INR)', type: 'number', required: true },

        { name: 'check_inn_stock', label: 'Check INN Stock', placeholder: 'Check INN Stock', type: 'select', required: true, options:['In Stock', 'Out of Stock', 'Low Stock']},

        // { name: 'create_a_purchase_order', label: 'Create a purchase order', placeholder: 'Create a purchase order', type: 'text' },

      ],
    },
  ];

  const dataset = [
    { order: 'Daily', value: 250 },
    { order: 'Weekly', value: 600 },
    { order: 'Monthly', value: 900 },
    { order: 'Quarterly', value: 1200 },
    { order: 'Yearly', value: 800 },
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
      setBarChartData(dataset);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Box className="suppliers_for_shop_wrapper_2">
        <Box className="row">
        <Header icon_1={suppliers_for_shop_icon} icon_2={financial_management_icon2} title="Suppliers For Shop" icon_1_link='../emotional/eshop/suppliers-for-shop3' icon_2_link='../emotional/eshop' redirectTo='../emotional/eshop'/>

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />

                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, form.name)}>
                    {form.fields.map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box className={field.name === 'dateFrom' || field.name === 'dateTo' ? "date_field_container" : ""}>
                          <FormField
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[form.name][field.name]}
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                            readOnly={field.readOnly}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                    <Box className="btn_group">
                      <Typography className='label'>Create a purchase order</Typography>
                      <Button className='btn'>Create a purchase order </Button>
                    </Box>
                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="btn">Submit</Button>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box className="sub_container">
                {
                  barChartData.length > 0 ? <BarChartComponent dataset={dataset} label="Price" dataKey="order" /> : <Box className="show_message">
                  <Typography className='blank'>
                      Please fill the form first to see the graphical representation.
                  </Typography>  
                  </Box> 
                }
                
              </Box>
            </Box>
          </Box>

          <Box className="col">
            <Button2 text="Back" redirectTo={-1} />
            <Button2 text="Next" redirectTo={-1} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Suppliers_for_shop2;
