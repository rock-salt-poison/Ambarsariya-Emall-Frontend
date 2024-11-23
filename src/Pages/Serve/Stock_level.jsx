import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import stock_management_icon from '../../Utils/images/Serve/emotional/eshop/stock_management.png';
import stock_management_icon2 from '../../Utils/images/Serve/emotional/eshop/stock_management_icon2.png';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Stock_level(props) {
  const [showDateRange, setShowDateRange] = useState(false); // Manage state for date range visibility
  const [stock_count, set_stock_count] = useState(10);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      fields: [
        { name: 'product', label: 'Product Identifier', placeholder:'Select product', type: 'select', options: ['Medicine', 'Supplements', 'Medical Equipment', 'Personal Care', 'First Aid & Emergency Care'], required:true },

        { name: 'description', label: 'Description', placeholder: 'Description', type: 'textarea', options: ['Medicine', 'Supplements', 'Medical Equipment', 'Personal Care', 'First Aid & Emergency Care'], required: true },

        { name: 'clearance_price', label: 'Clearance Price', placeholder: 'Clearance Price', type: 'number', required: true, defaultValue:999 },

        { name: 'promotion_period', label: 'Promotion period', placeholder: 'Select promotion period', type: 'date', required: true },

        { name: 'contact_information', label: 'Contact information', placeholder: 'Enter contact information', type: 'text', required: true },

        { name: 'call_to_action', label: 'Call to action', placeholder: 'call to action', type: 'text', required: true },
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

  // Focus and blur handlers for date fields
  const handleFocus = (e) => {
    if(e.target.name==='promotion_period'){
      // console.log(e.target.type)
      e.target.type='date'
    }
  };

  const handleBlur = (e) => {
    if(e.target.name==='promotion_period'){
      e.target.type="text";
    }
  };

  const handleDecrement = () =>{
    if(stock_count>0){
      set_stock_count(stock_count-1);
    }
  }
  const handleIncrement = () =>{
      set_stock_count(stock_count+1);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="stock_level_wrapper">
        <Box className="row">
        <Header icon_1={stock_management_icon} icon_2={stock_management_icon2} title="Stock Level" icon_1_link='../emotional/eshop/stock-reports' icon_2_link='' redirectTo='../emotional/eshop'/>

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />

                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, form.name)}>
                    {form.fields.slice(0,2).map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box>
                          <FormField
                            name={field.name}
                            label={field.label}
                            type={field.type === 'date' ? 'text' : field.type}
                            value={field.defaultValue ? field.defaultValue : formData[form.name][field.name]}
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                            readOnly={field.readOnly}
                            handleFocus={(e) => handleFocus(e)}
                            handleBlur={(e)=>handleBlur(e)}
                          />
                        </Box>
                      </Tooltip>
                    ))}

                    <Box className="counter_field">
                      <Typography className='label'>Quantity</Typography>
                      <Box className="counter_container">
                          <Button className='decrement' onClick={()=>{handleDecrement()}}>
                              <RemoveIcon/>
                          </Button>
                          <Typography className="stock_count">
                            {stock_count}
                          </Typography>
                          <Button className='increment' onClick={()=>{handleIncrement()}}>
                              <AddIcon/>
                          </Button>
                      </Box>
                    </Box>
                    {form.fields.slice(2).map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box >
                          <FormField
                            name={field.name}
                            label={field.label}
                            type={field.type === 'date' ? 'text' : field.type}
                            value={field.name === 'sector' ? field.defaultValue : formData[form.name][field.name]}
                            onChange={(e) => handleChange(e, form.name)}
                            placeholder={field.placeholder}
                            options={field.options}
                            error={!!errors[form.name]?.[field.name]}
                            errorMessage={errors[form.name]?.[field.name]}
                            readOnly={field.readOnly}
                            handleFocus={(e) => handleFocus(e)}
                            handleBlur={(e)=>handleBlur(e)}
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

              {/* <Box className="sub_container">
                <BarChartComponent dataset={dataset} label="INR" dataKey="month"/>
              </Box> */}
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

export default Stock_level;
