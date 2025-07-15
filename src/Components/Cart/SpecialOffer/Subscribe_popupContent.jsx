import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import radio_icon from '../../../Utils/images/Sell/cart/special_offers/radio_circle.webp';
import radio_button from '../../../Utils/images/Sell/cart/special_offers/radio_button.webp';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Subscribe_popupContent({ setSubmittedData }) {
  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: 'var(--yellow)',
  };

  const theme = createCustomTheme(themeProps);
  const allProducts = useSelector((state) => state.cart.selectedProducts);
  const products = allProducts.filter((p) => p.subscribe === true);
  console.log(products);
  

  const initialData = { product: '', cost_per_unit: '', no_of_items: '' };

  const [formData, setFormData] = useState({
    Daily: { ...initialData },
    Weekly: { ...initialData },
    Monthly: { ...initialData },
    Edit: { ...initialData },
  });

  const [selectedOption, setSelectedOption] = useState('Daily');

  const formFields = [
    {
      id: 1,
      placeholder: 'Select Product',
      name: 'product',
      type: 'select',
      options: products.map((p) => p.product_name),
      required: true,
    },
    {
      id: 2,
      placeholder: 'Cost per unit',
      name: 'cost_per_unit',
      type: 'text',
      readOnly: true,
      behavior: 'number',
      required: true,
    },
    {
      id: 3,
      placeholder: 'Min no. of units',
      name: 'no_of_items',
      type: 'text',
      required: true,
      readOnly: true,
    },
  ];

  const isFormValid = (data) => Object.values(data).every((value) => value !== '');

  const handleChange = (event, option) => {
    const { name, value } = event.target;
    let updatedData = { ...formData[option], [name]: value };
    console.log(option);
    if (name === 'product') {
      const selectedProduct = products.find((p) => p.product_name === value);
      console.log(selectedProduct);
      
      updatedData.cost_per_unit = selectedProduct ? selectedProduct?.matched_price ? `₹ ${selectedProduct.matched_price} /-` : selectedProduct?.selling_price ? `₹ ${selectedProduct.selling_price} /-` : selectedProduct?.product_selling_price && `₹ ${selectedProduct.product_selling_price} /-` : '';
      updatedData.subscription_type = option;
      updatedData.product_id = selectedProduct.product_id ;
      updatedData.no_of_items = option === 'Daily' ? `${selectedProduct?.daily_min_quantity} ${selectedProduct?.unit}` : option === 'Weekly' ? `${selectedProduct?.weekly_min_quantity} ${selectedProduct?.unit}` : option === 'Monthly' ? `${selectedProduct?.monthly_min_quantity} ${selectedProduct?.unit}` : option === 'Edit' && ``;
    }

    setFormData((prev) => ({ ...prev, [option]: updatedData }));
  };

  const handleClick = (event, option) => {
    event.preventDefault();
    handleSubmit(formData[selectedOption]);
      setSelectedOption(option);

      if(option !== selectedOption){
        setFormData((prev) => ({
          ...prev,
          [selectedOption]: { ...initialData },
        }));
      }    

    
  };

  const handleSubmit = (dataToSubmit) => {
    setSubmittedData(dataToSubmit);
    console.log('Submitted Data:', dataToSubmit);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="subscribe">
        {['Daily', 'Weekly', 'Monthly', 'Edit'].map((option) => (
          <Link
            key={option}
            className={`option ${selectedOption === option ? 'mask_none selected' : ''}`}
            onClick={(event) => handleClick(event, option)}
          >
            <Box className="header">
              <Typography className="heading">{option}</Typography>
              <Box component="img" alt="radio" className="radio_icon" src={radio_icon} />
              <Box component="img" alt="radio" className="radio_button" src={radio_button} />
            </Box>
            <Box className="body">
              <GeneralLedgerForm
                formfields={formFields}
                formData={formData[option]}
                onChange={(e) => handleChange(e, option)}
                errors={{}}
                submitBtnVisibility={false}
                noValidate={false}
              />
            </Box>
          </Link>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default Subscribe_popupContent;
