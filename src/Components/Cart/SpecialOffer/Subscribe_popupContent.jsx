import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import radio_icon from '../../../Utils/images/Sell/cart/special_offers/radio_circle.webp';
import radio_button from '../../../Utils/images/Sell/cart/special_offers/radio_button.webp';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import { Link } from 'react-router-dom';

function Subscribe_popupContent() {
  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: 'var(--yellow)',
  };

  const theme = createCustomTheme(themeProps);

  const initialData = {
    item: '',
    cost_per_unit: '',
    no_of_items: '',
  };

  // State to manage data for each option
  const [dailyData, setDailyData] = useState(initialData);
  const [weeklyData, setWeeklyData] = useState(initialData);
  const [monthlyData, setMonthlyData] = useState(initialData);
  const [editData, setEditData] = useState(initialData);

  // State to track selected option (only one can be selected at a time)
  const [selectedOption, setSelectedOption] = useState('Daily'); // Track selected option

  const formFields = [
    {
      id: 1,
      placeholder: 'Select Item',
      name: 'item',
      type: 'select',
      options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
    },
    {
      id: 2,
      placeholder: 'Cost per unit',
      name: 'cost_per_unit',
      type: 'text',
      behavior: 'number',
    },
    {
      id: 3,
      placeholder: 'Min no. of units',
      name: 'no_of_items',
      type: 'number',
    },
  ];

  const handleChange = (event, option) => {
    const { name, value } = event.target;
    switch (option) {
      case 'Daily':
        setDailyData({ ...dailyData, [name]: value });
        break;
      case 'Weekly':
        setWeeklyData({ ...weeklyData, [name]: value });
        break;
      case 'Monthly':
        setMonthlyData({ ...monthlyData, [name]: value });
        break;
      case 'Edit':
        setEditData({ ...editData, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleClick = (option) => {
    // Set the selected option to the clicked one, deselect others
    setSelectedOption(option);
  };

  const handleSubmit = (event, option) => {
    event.preventDefault(); // Prevent default form submission
    let dataToSubmit;

    // Determine which data to submit based on selected option
    switch (option) {
      case 'Daily':
        dataToSubmit = dailyData;
        break;
      case 'Weekly':
        dataToSubmit = weeklyData;
        break;
      case 'Monthly':
        dataToSubmit = monthlyData;
        break;
      case 'Edit':
        dataToSubmit = editData;
        break;
      default:
        break;
    }

    console.log(dataToSubmit); // Output the data to console
    // Proceed with further submission logic, e.g., API call
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="subscribe">
        {/* Render each option as a separate box */}
        {['Daily', 'Weekly', 'Monthly', 'Edit'].map((option) => (
          <Link
            key={option}
            className={`option ${selectedOption === option ? 'mask_none selected' : ''}`} // Apply mask_none and selected class only for the selected option
            onClick={() => handleClick(option)} // Set selected option on click
          >
            <Box className="header">
              <Typography className="heading">{option}</Typography>
              <Box component="img" alt="radio" className="radio_icon" src={radio_icon} />
              <Box component="img" alt="radio" className="radio_button" src={radio_button} />
            </Box>
            <Box className="body">
              <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={(e) => handleSubmit(e, option)} // Pass the selected option to handleSubmit
                formData={option === 'Daily' ? dailyData : option === 'Weekly' ? weeklyData : option === 'Monthly' ? monthlyData : editData} // Pass appropriate formData
                onChange={(e) => handleChange(e, option)} // Handle changes for the correct option
                errors={{}} // You can add validation logic if needed
                submitBtnVisibility={false} // Hide the submit button if needed
              />
            </Box>
          </Link>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default Subscribe_popupContent;
