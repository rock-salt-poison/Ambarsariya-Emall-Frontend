import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import stock_management_icon from '../../Utils/images/Serve/emotional/eshop/stock_management.png';
import stock_management_icon2 from '../../Utils/images/Serve/emotional/eshop/stock_management_icon2.svg';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import Header from '../../Components/Serve/SupplyChain/Header';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Stock_management(props) {
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
        { name: 'store_keeper', label: 'Store Keeper', placeholder:'Select employees', type: 'select', options: ['John	Doe', 'Jane	Smith', 'Alice	Johnson', 'Bob	Brown', 'First Aid & Emergency Care'] },
        { name: 'inventory', label: 'Inventory', placeholder: 'Auto / Manual Item Wise', type: 'select', options: ['Medicine', 'Supplements', 'Medical Equipment', 'Personal Care', 'First Aid & Emergency Care'], required: true },
        { name: 'warehouse_storage_facilities', label: 'Warehouse / Storage Facilities', placeholder: 'Upload CSV Sheet Item Wise SKU', type: 'file', required: true },
        { name: 'daily_sale', label: 'Daily sale from store', placeholder: 'Sale Order', type: 'date', required: true },
        
      ],
    },
  ];

  const dataset = [
    { london: 59, paris: 57, newYork: 86, value: 21, month: '1' },
    { london: 50, paris: 52, newYork: 78, value: 28, month: '2' },
    { london: 47, paris: 53, newYork: 106, value: 41, month: '3' },
    { london: 54, paris: 56, newYork: 92, value: 73, month: '4' },
    { london: 57, paris: 69, newYork: 92, value: 99, month: '5' },
    { london: 60, paris: 63, newYork: 103, value: 144, month: '6' },
    { london: 59, paris: 60, newYork: 105, value: 319, month: '7' },
    { london: 65, paris: 60, newYork: 106, value: 249, month: '8' },
    { london: 51, paris: 51, newYork: 95, value: 131, month: '9' },
    { london: 60, paris: 65, newYork: 97, value: 55, month: '10' },
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

  // Focus and blur handlers for date fields
  const handleFocus = (e) => {
    if(e.target.name==='daily_sale'){
      // console.log(e.target.type)
      e.target.type='date'
    }
  };

  const handleBlur = (e) => {
    if(e.target.name==='daily_sale'){
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
      <Box className="stock_management_wrapper">
        <Box className="row">
        <Header icon_1={stock_management_icon} icon_2={stock_management_icon2} title="Stock Management" icon_1_link='../emotional/eshop/stock-level' icon_2_link='' redirectTo='../emotional/eshop'/>

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />

                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, form.name)}>
                    {form.fields.slice(0,2).map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box className={field.name === 'dateFrom' || field.name === 'dateTo' ? "date_field_container" : ""}>
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

                    <Box className="counter_field">
                      <Typography className='label'>Items</Typography>
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
                        <Box className={field.name === 'dateFrom' || field.name === 'dateTo' ? "date_field_container" : ""}>
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

              <Box className="sub_container">
                {
                  barChartData.length > 0 ? <BarChartComponent dataset={dataset} label="INR" dataKey="month" /> : <Box className="show_message">
                  <Typography className='blank'>
                      Please select sale order date first to see the graphical representation.
                  </Typography>  
                  </Box> 
                }
                
              </Box>
            </Box>
          </Box>

          <Box className="col">
            <Button2 text="Back" redirectTo='../emotional/eshop/supply-chain-sale-order' />
            <Button2 text="Next" redirectTo='../emotional/eshop/financial-management' />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Stock_management;
