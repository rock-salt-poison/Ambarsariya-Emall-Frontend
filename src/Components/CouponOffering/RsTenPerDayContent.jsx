import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addCoupon } from '../../store/couponsSlice';
import AddIcon from '@mui/icons-material/Add';

function RsTenPerDayContent() {
  const dispatch = useDispatch();

  // Get retailer coupon data from Redux store
  const rsTenPerDay = useSelector((state) => state.coupon.rsTenPerDay);

  // Initialize local state for discounts
  const [discounts, setDiscounts] = useState({
    rsTenPerDay: { months: '', checked: false },
  });

  // Sync local state with Redux when retailerCoupon data changes
  useEffect(() => {
    if (rsTenPerDay && rsTenPerDay.discounts) {
      // If coupon data exists in Redux, pre-fill the form
      setDiscounts(rsTenPerDay.discounts);
      console.log(rsTenPerDay)
    }
  }, [rsTenPerDay]); // This will run when retailerCoupon changes

  // Handle form input changes
  const handleOnChange = (event, field) => {
    const { name, value } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [name]: value
      }
    }));
  };

  const handleCheckboxChange = (event, field) => {
    const { checked } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        checked,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(discounts);

    // Dispatch the coupon details to Redux store
    dispatch(addCoupon({ type: 'rsTenPerDay', coupon: { id: Date.now(), discounts } }));
  };

    return (
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
             <Typography className="description" sx={{textAlign:'center'}}>
                A paid version which has minimum 4 months period.
            </Typography>
            <Box className="checkbox-group">
                <DiscountField
                    name1="months"
                    label="10 Rs. per day  x"
                    value={rsTenPerDay?.discounts?.rsTenPerDay || discounts.rsTenPerDay}
                    checked={discounts.rsTenPerDay.checked || false}
                    handleOnChange={(e) => handleOnChange(e, 'rsTenPerDay')}
                    handleCheckboxChange={(e) => handleCheckboxChange(e, 'rsTenPerDay')}
                    percentagePlaceholder="4"
                    field2={false}
                    additionalText="months"                      
                />
            </Box>

            <Box className="description total" sx={{textAlign:'center'}}>
               <Typography className="descripton" variant="span">Total = 10 x 120 = 1200</Typography>  <AddIcon/> <Typography className="descripton" variant="span">tax</Typography> 
            </Box>

            <Typography className="description">
            *FIRST QUARTER IS DEMO USE SERVE SECTION
            </Typography>

            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default RsTenPerDayContent;
