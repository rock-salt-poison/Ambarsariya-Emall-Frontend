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
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DateRangePicker from 'rsuite/esm/DateRangePicker';

function Suppliers_for_shop3(props) {
  const [barChartData, setBarChartData] = useState([]); // Manage state for date range visibility
  const [stockCount, setStockCount] = useState(1);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: 'Supplier for shop',
      fields: [
        { name: 'procurement_order', label: 'Procurement Order', placeholder: 'upload Procurement document', type: 'file', required: true },
        { name: 'check_inn_store', label: 'Check INN Store', placeholder: 'Upload item wise CSV', type: 'file', required: true },
        { name: 'total', label: 'Total Display', placeholder: 'Total Display', type: 'number', required: true },
      ],
    },
  ];

  const dataset = [
    { value: 21, month: '1' },
    { value: 28, month: '2' },
    { value: 41, month: '3' },
    { value: 73, month: '4' },
    { value: 99, month: '5' },
    { value: 144, month: '6' },
    { value: 319, month: '7' },
    { value: 249, month: '8' },
    { value: 131, month: '9' },
    { value: 55, month: '10' },
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
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [name]: file || value,
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

  const handleDecrement = () => {
    if (stockCount > 1) { // Ensure stock count does not go below 1
      setStockCount(stockCount - 1);
    }
  };

  const handleIncrement = () => {
    setStockCount(stockCount + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="suppliers_for_shop_wrapper_3">
        <Box className="row">
          <Header 
            icon_1={suppliers_for_shop_icon} 
            icon_2={financial_management_icon2} 
            title="Suppliers For Shop" 
            icon_1_link='../emotional/eshop/suppliers-for-shop' 
            icon_2_link='../emotional/eshop' 
            redirectTo='../emotional/eshop'
          />

          <Box className="col">
            <Box className="container">
              {formsConfig.map((form, index) => (
                <Box className="col-3" key={index}>
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />

                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, form.name)}>
                    {form.fields.slice(0, 2).map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box>
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

                    <Box className="counter_field">
                      <Typography className='label'>Items</Typography>
                      <Box className="counter_container">
                        <Button className='decrement' onClick={handleDecrement}>
                          <RemoveIcon />
                        </Button>
                        <Typography className="stock_count">
                          {stockCount}
                        </Typography>
                        <Button className='increment' onClick={handleIncrement}>
                          <AddIcon />
                        </Button>
                      </Box>
                    </Box>

                    {form.fields.slice(2).map((field, idx) => (
                      <Tooltip key={idx} title={field.placeholder} className="tooltip" placement="bottom-end">
                        <Box>
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

                    <Box className="item_count">
                      <Typography className="label">
                        Select date-wise procurement
                      </Typography>
                      <DateRangePicker />
                    </Box>

                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="btn">Submit</Button>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box className="sub_container">
                {
                  barChartData.length > 0 ? (
                    <BarChartComponent dataset={dataset} label="INR" dataKey="month" />
                  ) : (
                    <Box className="show_message">
                      <Typography className='blank'>
                        Please fill the form first to see the graphical representation.
                      </Typography>
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Box>

          <Box className="col">
            <Button2 text="Back" redirectTo={-1} />
            <Button2 text="Next" redirectTo="/emotional/eshop/suppliers-for-shop3" />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Suppliers_for_shop3;
