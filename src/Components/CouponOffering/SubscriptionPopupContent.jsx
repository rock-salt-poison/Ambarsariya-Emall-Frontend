import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import DateRangePicker from 'rsuite/esm/DateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../store/couponsSlice';

function SubscriptionPopupContent() {
  const dispatch = useDispatch();

  const subscriptionCoupon = useSelector((state) => state.coupon.subscription);

  const [discounts, setDiscounts] = useState({
    subscription_daily: { checked: false, value_1: '' },
    subscription_weekly: { checked: false, value_1: '' },
    subscription_monthly: { checked: false, value_1: '' },
    subscription_edit: { checked: false, value_1: '', value_2: '', dateRange: null },
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
    setDiscounts((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        dateRange: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(discounts);
    dispatch(addCoupon({ type: 'subscription', coupon: { id: Date.now(), discounts } }));
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
        name="value_1"
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
        name="value_1"
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
        name="value_1"
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
          name="value_1"
          label={
            <>
              <DateRangePicker />
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
    </Box>
  );
}

export default SubscriptionPopupContent;

