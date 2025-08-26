import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import DateRangePicker from 'rsuite/esm/DateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../store/couponsSlice';
import CustomSnackbar from '../CustomSnackbar';

function SubscriptionPopupContent({ onClose }) {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const subscriptionCoupon = useSelector((state) => state.coupon.subscription);

  const [discounts, setDiscounts] = useState({
    subscription_daily: { checked: false, percent_off: '' },
    subscription_weekly: { checked: false, percent_off: '' },
    subscription_monthly: { checked: false, percent_off: '' },
    subscription_edit: { checked: false, percent_off: '', dateRange: null },
  });

  useEffect(() => {
    if (subscriptionCoupon?.discounts) {
      setDiscounts(subscriptionCoupon.discounts);
    }
  }, [subscriptionCoupon]);

  const handleOnChange = (event, field) => {
    const { name, value } = event.target;
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [name]: value,
      },
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

  const handleDateRangeChange = (value, field) => {
  const serializedRange = value
    ? value.map((date) =>
        new Date(
          date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        ).toISOString()
      )
    : null;

  setDiscounts((prevState) => ({
    ...prevState,
    [field]: {
      ...prevState[field],
      dateRange: serializedRange,
    },
  }));
};




  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(discounts);
    dispatch(addCoupon({ type: 'subscription', coupon: { id: Date.now(), discounts } }));
    setSnackbar({
      open: true,
      message: "Form Submitted successfully.",
      severity: "success",
    });
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 1500)
  };


  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="offerings_popup_form subscription"
      onSubmit={handleSubmit}
    >
      <Box className="checkbox-group">
        <DiscountField
          name1="percent_off"
          label="Daily"
          checked={discounts.subscription_daily.checked}
          value={discounts.subscription_daily}
          handleOnChange={(e) => handleOnChange(e, 'subscription_daily')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'subscription_daily')}
          percentagePlaceholder="10"
          additionalText={<><PercentIcon /> Off</>}
          field2={false}
        />
        <DiscountField
          name1="percent_off"
          label="Weekly"
          checked={discounts.subscription_weekly.checked}
          value={discounts.subscription_weekly}
          handleOnChange={(e) => handleOnChange(e, 'subscription_weekly')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'subscription_weekly')}
          percentagePlaceholder="10"
          additionalText={<><PercentIcon /> Off</>}
          field2={false}
        />
        <DiscountField
          name1="percent_off"
          label="Monthly"
          checked={discounts.subscription_monthly.checked}
          value={discounts.subscription_monthly}
          handleOnChange={(e) => handleOnChange(e, 'subscription_monthly')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'subscription_monthly')}
          percentagePlaceholder="10"
          additionalText={<><PercentIcon /> Off</>}
          field2={false}
        />
        <DiscountField
          name1="percent_off"
          label={
            <>
              <DateRangePicker
  value={
    discounts.subscription_edit.dateRange
      ? discounts.subscription_edit.dateRange.map(
          (date) =>
            new Date(
              new Date(date).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            )
        )
      : null
  }
  showOneCalendar
  ranges={[]}
  onChange={(value) => handleDateRangeChange(value, "subscription_edit")}
/>

            </>
          }
          value={discounts.subscription_edit}
          checked={discounts.subscription_edit.checked}
          handleOnChange={(e) => handleOnChange(e, 'subscription_edit')}
          handleCheckboxChange={(e) => handleCheckboxChange(e, 'subscription_edit')}
          percentagePlaceholder="10"
          additionalText={
            <>
              <PercentIcon className="icon_2" /> Off
            </>
          }
          field2={false}
        />
      </Box>

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

export default SubscriptionPopupContent;

