import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../store/couponsSlice';

function LoyaltyPopupContent() {

    const dispatch = useDispatch();

    // Get retailer coupon data from Redux store
    const loyaltyCoupon = useSelector((state) => state.coupon.loyalty); 
  
    // Initialize local state for discounts
    const [discounts, setDiscounts] = useState({
      loyalty_unlock: { percentage: '', minimum_order: '' },
      loyalty_bonus: { flat_percent: '' },
      loyalty_prepaid: { pay: '', get: '' },
      loyalty_by_customer: { save_percent: '' }
    });
  
    // Sync local state with Redux when retailerCoupon data changes
    useEffect(() => {
      if (loyaltyCoupon && loyaltyCoupon.discounts) {
        // If coupon data exists in Redux, pre-fill the form
        setDiscounts(loyaltyCoupon.discounts);
        console.log(loyaltyCoupon)
      }
    }, [loyaltyCoupon]); // This will run when retailerCoupon changes
  
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
      dispatch(addCoupon({ type: 'loyalty', coupon: { id: Date.now(), discounts } }));
    };
    return (
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
            <Box className="checkbox-group">
                <DiscountField
                    name1="percentage"
                    name2="minimum_order"
                    label="Unlock"
                    value={discounts.loyalty_unlock}
                    handleOnChange={(e) => handleOnChange(e, 'loyalty_unlock')}
                    checked={discounts.loyalty_unlock.checked}
                    handleCheckboxChange={(e) => handleCheckboxChange(e, 'loyalty_unlock')}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> discount for last purchase above <CurrencyRupeeIcon className="icon_2" />
                        </>
                      }
                      
                />
                <DiscountField
                    name1="flat_percent"
                    label="Loyalty bonus flat"
                    value={discounts.loyalty_bonus}
                    checked={discounts.loyalty_bonus.checked}
                    handleCheckboxChange={(e) => handleCheckboxChange(e, 'loyalty_bonus')}
                    handleOnChange={(e) => handleOnChange(e, 'loyalty_bonus')}
                    percentagePlaceholder="10"
                    field2={false}
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off
                        </>
                      }
                      />
                <DiscountField
                    name1="pay"
                    name2="get"
                    label={<>
                         Pre-Paid Coupons: Pay <CurrencyRupeeIcon className="icon_2" />
                    </>}
                    handleOnChange={(e) => handleOnChange(e, 'loyalty_prepaid')}
                    value={discounts.loyalty_prepaid}
                    checked={discounts.loyalty_prepaid.checked}
                    handleCheckboxChange={(e) => handleCheckboxChange(e, 'loyalty_prepaid')}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={<>
                        , get  <CurrencyRupeeIcon className="icon_2" />
                   </>}
                    additionalText2="value"
                />
                <DiscountField
                    name1="save_percent"
                    label="Referred by a Loyal Customer? Save"
                    handleOnChange={(e) => handleOnChange(e, 'loyalty_by_customer')}
                    value={discounts.loyalty_by_customer}
                    checked={discounts.loyalty_by_customer.checked}
                    handleCheckboxChange={(e) => handleCheckboxChange(e, 'loyalty_by_customer')}
                    field2={false}
                    percentagePlaceholder="10"
                    additionalText={<>
                         <PercentIcon className="icon_2" /> Now !
                   </>}
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

export default LoyaltyPopupContent;
