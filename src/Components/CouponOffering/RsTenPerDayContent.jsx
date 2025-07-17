import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DiscountField from '../Form/DiscountField';
import AddIcon from '@mui/icons-material/Add';
import { addCoupon } from '../../store/couponsSlice';
import CustomSnackbar from '../CustomSnackbar';
import { HandleRazorpayPayment } from '../../API/HandleRazorpayPayment';

function RsTenPerDayContent({ onClose }) {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const rsTenPerDay = useSelector((state) => state.coupon.rsTenPerDay);

  const [discounts, setDiscounts] = useState({
    basicEdition: { checked: false },
    standardEdition: { checked: false },
    premiumEdition: { checked: false },
    productUpload: { checked: true },
  });

  useEffect(() => {
    if (rsTenPerDay?.discounts) {
      setDiscounts(rsTenPerDay.discounts);
    }
  }, [rsTenPerDay]);

  const handleOnChange = (event, field) => {
    const { name, value } = event.target;
    setDiscounts((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (event, field) => {
    const { checked } = event.target;
    setDiscounts((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        checked,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selected = Object.values(discounts).filter((d) => d.checked);

    if (selected.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please select at least one edition.',
        severity: 'warning',
      });
      return;
    }

    try {
      // If productUpload is selected, trigger Razorpay
      if (discounts.productUpload?.checked) {
        const buyerDetails = {
          name: 'Retailer Name',         // Replace with actual user info
          email: 'retailer@email.com',   // Optional
          contact: '9999999999',         // Optional
        };

        const amount = 500; // Razorpay takes amount in paisa (₹500)

        const paymentResp = await HandleRazorpayPayment({ amount, buyerDetails });

        console.log('Payment successful:', paymentResp);

        setSnackbar({
          open: true,
          message: 'Payment successful. Coupon activated.',
          severity: 'success',
        });

      } else {
        setSnackbar({
          open: true,
          message: 'Form submitted successfully.',
          severity: 'success',
        });
      }

      // Save coupon in Redux after form is submitted or payment successful
      dispatch(addCoupon({ type: 'rsTenPerDay', coupon: { id: Date.now(), discounts } }));

      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (error) {
      console.error('Payment failed:', error);
      setSnackbar({
        open: true,
        message: 'Payment failed or cancelled.',
        severity: 'error',
      });
    }
  };

  const data = [
    {
      id: 1,
      name: 'basicEdition',
      description: 'Basic Infrastructure : In 300 discount coupons per year',
      disable: false,
    },
    {
      id: 2,
      name: 'standardEdition',
      description:
        'Standard Infrastructure : Rs.500 + taxes + 30 discount coupons per month',
      disable: true,
    },
    {
      id: 3,
      name: 'premiumEdition',
      description:
        'Premium Shops : Shop age must be greater than 4 yrs + Last 4 months standard shop, cost : 5000/month + 30 discount coupons',
      disable: true,
    },
  ];

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="offerings_popup_form form2"
      onSubmit={handleSubmit}
    >
      {/* <Typography className="description" sx={{ textAlign: 'center' }}>
        A paid version which has minimum 4 months period.
      </Typography> */}

      <Box className="checkbox-group">
        {data.map((d) => (
          <DiscountField
            key={d.name}
            label={d.description}
            value={discounts[d.name]}
            checked={!!discounts[d.name]?.checked}
            handleOnChange={(e) => handleOnChange(e, d.name)}
            handleCheckboxChange={(e) => handleCheckboxChange(e, d.name)}
            percentagePlaceholder="4"
            field1={false}
            field2={false}
            additionalText={d.additionalText}
            disable={d?.disable}
          />
        ))}
      </Box>

        <Box className="description checkbox-group">
          <DiscountField
            label="Pay Rs. 500 for Stock inventory managment and for products upload"
            value={discounts.productUpload}
            checked={!!discounts.productUpload?.checked}
            handleOnChange={(e) => handleOnChange(e, 'productUpload')}
            handleCheckboxChange={(e) => handleCheckboxChange(e, 'productUpload')}
            percentagePlaceholder="4"
            field1={false}
            field2={false}
          />
        </Box>

      <Typography className="description dark">
        Or See the video
      </Typography>

      <Box className="description total" sx={{ textAlign: 'center' }}>
        <Typography component="span" className="description">
          GST 18% applicable
        </Typography>
        {/* <AddIcon />
        <Typography component="span" className="description">
          tax
        </Typography> */}
      </Box>

      <Typography className="description">
        * FIRST QUARTER OF STANDARD SHOP IS FREE WITH BASIC SHOP
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

export default RsTenPerDayContent;
