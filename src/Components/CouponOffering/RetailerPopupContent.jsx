import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addCoupon } from '../../store/couponsSlice';
import CustomSnackbar from '../CustomSnackbar';

function RetailerPopupContent({ onClose }) {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get retailer coupon data from Redux store
  const retailerCoupon = useSelector((state) => state.coupon.retailer);

  // Initialize local state for discounts
  const [discounts, setDiscounts] = useState({
    retailer_upto: { percentage: '', order_upto: '' },
    retailer_flat: { flat: '', minimum_order: '' },
    retailer_freebies: { buy: '', get: '' }
  });

  // Sync local state with Redux when retailerCoupon data changes
  useEffect(() => {
    if (retailerCoupon && retailerCoupon.discounts) {
      // If coupon data exists in Redux, pre-fill the form
      setDiscounts(retailerCoupon.discounts);
      console.log(retailerCoupon)
    }
  }, [retailerCoupon]); // This will run when retailerCoupon changes

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
    dispatch(addCoupon({ type: 'retailer', coupon: { id: Date.now(), discounts } }));

    setSnackbar({
        open: true,
        message: "Form Submitted successfully.",
        severity: "success",
    });
    setTimeout(()=>{
      if(onClose){
        onClose();
      }
    }, 1500)
  };

  return (
    <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
      <Box className="checkbox-group">
        <DiscountField
          name1="percentage"
          name2="order_upto"
          value={discounts.retailer_upto}
          label="Percentage"
          checked={discounts.retailer_upto.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_upto')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_upto')}
          percentagePlaceholder="10"
          minOrderPlaceholder="1000"
          additionalText={<><PercentIcon className="icon_2" /> Off on order upto <CurrencyRupeeIcon className="icon_2" /></>}
        />
        <DiscountField
          name1="flat"
          name2="minimum_order"
          value={discounts.retailer_flat}
          label="Flat"
          checked={discounts.retailer_flat.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_flat')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_flat')}
          percentagePlaceholder="10"
          minOrderPlaceholder="1000"
          additionalText={<><PercentIcon className="icon_2" /> Off on minimum order of <CurrencyRupeeIcon className="icon_2" /></>}
        />
        <DiscountField
          name1="buy"
          name2="get"
          value={discounts.retailer_freebies}
          label="Buy"
          checked={discounts.retailer_freebies.checked}
          handleOnChange={(e) => handleOnChange(e, 'retailer_freebies')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'retailer_freebies')}
          percentagePlaceholder="2"
          minOrderPlaceholder="1"
          additionalText="Get"
          additionalText2="Free"
        />

      </Box>

      <Typography className="description">
        Coupons expire after 1 year. The discount will apply on top of the total.
      </Typography>

      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default RetailerPopupContent;
