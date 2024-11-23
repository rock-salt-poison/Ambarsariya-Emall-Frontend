import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Typography, Tooltip } from '@mui/material';
import FormField from '../../Components/Form/FormField';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import supply_chain_management_icon from '../../Utils/images/Serve/emotional/eshop/supply_chain_management_icon.webp';
import HR_management_icon from '../../Utils/images/Serve/emotional/eshop/HR_management_icon.png';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Button2 from '../../Components/Home/Button2';
import PieChartComponent from '../../Components/Serve/SupplyChain/PieChartComponent';
import BarChartComponent from '../../Components/Serve/SupplyChain/BarChartComponent';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../Components/Serve/SupplyChain/Header';

function Supply_chain_management(props) {
  const [stock_count, set_stock_count] = useState(99); // Manage state for date range visibility

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const formsConfig = [
    {
      name: 'Supply Order',
      fields: [
        { name: 'item_group', label: 'Item Group', placeholder:'Select Item Group', type: 'select', options: ['Medicine Group A','Medicine Group B', 'Supplements Group A','Medical Equipment Group A', 'Supplements Group B'], required:true },

        { name: 'members', label: 'Members', placeholder: 'Select Members', type: 'select-check', options: ['John	Doe', 'Jane	Smith', 'Alice	Johnson', 'Bob	Brown', 'First Aid & Emergency Care'], required: true },

        { name: 'group_by_rotation', label: 'Group By Rotation', placeholder: 'Select Group By Rotation', type: 'select', options: ['Daily', 'Weekly', 'Monthly', 'Quaterly', 'Yearly'], required: true },

        { name: 'supply_order', label: 'Supply Order', value: 'Click Here to Create Supply Order', type: 'button', required: true },

        
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


  const handleDecrement = () =>{
    if(stock_count>0){
      set_stock_count(stock_count-1);
    }
  }
  const handleIncrement = () =>{
      set_stock_count(stock_count+1);
  }

  const dataset = [
    { period: 'Daily', value: 550 },
    { period: 'Weekly', value: 250 },
    { period: 'Monthly', value: 850 },
    { period: 'Quaterly', value: 600 },
    { period: 'Yearly', value: 1000 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="supply_chain_management_wrapper">
        <Box className="row">
          <Header icon_1={supply_chain_management_icon} icon_2={HR_management_icon} title="Supply Chain" icon_1_link='../emotional/eshop/forecast' icon_2_link='../emotional/eshop/hr-management' redirectTo='../emotional/eshop'/>

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
                            label={field.label}
                            type={field.type === 'date' ? 'text' : field.type}
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

                    <Box className="counter_field">
                      <Typography className='label'>Update stock management</Typography>
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
                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="btn">Submit</Button>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box className="sub_container">
                <Box className="pieCharts">
                  <PieChartComponent
                    title="Today's Sale"
                    pieData="data1"
                    hideLegend={false}
                    // onHeadingClick={handlePieChartHeadingClick}
                  />
                  <PieChartComponent
                    title="Previous Sale"
                    pieData="data2"
                    hideLegend={true}
                    // onHeadingClick={handlePieChartHeadingClick}
                  />
                </Box>
                <BarChartComponent dataset={dataset} label="No. of items sold" dataKey="period"/>
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

export default Supply_chain_management;
