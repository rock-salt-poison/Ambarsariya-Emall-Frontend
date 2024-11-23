import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import retailer_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/retailer.webp';
import subscription_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/subscription.webp';
import loyalty_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/loyalty.webp';
import customizable_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/customizable.webp';
import radio_icon from '../../../Utils/images/Sell/cart/special_offers/radio_circle.webp';
import radio_button from '../../../Utils/images/Sell/cart/special_offers/radio_button.webp';
import { Link } from 'react-router-dom';

function RetailerCoupon({ selectedCoupon }) {

  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: '#f8e3cc',
  };

  const theme = createCustomTheme(themeProps);
  const [selectedOption, setSelectedOption] = useState(1);

  const coupons = {
    retailer_coupon: [
      { id: 1, discount_percentage: '40' },
      { id: 2, discount_percentage: '50' },
      { id: 3, discount_percentage: '60' },
      { id: 4, discount_percentage: '70' },
    ],
    subscription_coupon: [
      { id: 1, discount_percentage: '30' },
      { id: 2, discount_percentage: '40' },
      { id: 3, discount_percentage: '50' },
      { id: 4, discount_percentage: '60' },
    ],
    loyalty_coupon: [
      { id: 1, discount_percentage: '20' },
      { id: 2, discount_percentage: '30' },
      { id: 3, discount_percentage: '40' },
      { id: 4, discount_percentage: '50' },
    ],
    customizable_coupon: [
      { id: 1, discount_percentage: '25' },
      { id: 2, discount_percentage: '35' },
      { id: 3, discount_percentage: '45' },
      { id: 4, discount_percentage: '55' },
    ],
  };

  const couponImages = {
    retailer_coupon: retailer_coupon,
    subscription_coupon: subscription_coupon,
    loyalty_coupon: loyalty_coupon,
    customizable_coupon: customizable_coupon,
  };

  const couponTitle = {
    retailer_coupon: "Retailer Coupons",
    subscription_coupon: "Subscription Coupons",
    loyalty_coupon: "Loyalty Coupons",
    customizable_coupon: "Customizable Coupons",
  };
  const selectedCouponKey = selectedCoupon?.alt; // Assuming `title` contains the type

  const handleClick = (e, id) => {
    setSelectedOption(id)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="title_container">
        <Typography className="title">
          {couponTitle[selectedCouponKey] || 'Coupons'}
        </Typography>
      </Box>
      <Box className="body_container">
        {coupons[selectedCouponKey]?.map((coupon) => {
          return (
            <React.Fragment key={coupon.id}>
              <Link 
                onClick={(e) => { handleClick(e, coupon.id) }} 
                className={`coupon_container ${selectedOption === coupon.id ? 'mask_none selected' : ''}`}
              >
                <Box component="img" className='coupon' alt='coupons' src={couponImages[selectedCouponKey]} />
                <Box component="img" alt="radio" className='radio_icon' src={radio_icon} />
                <Box component="img" alt="radio" className="radio_button" src={radio_button} />

                <Box className="discount_coupon">
                  <Typography className='discount_percentage'>{coupon.discount_percentage}%</Typography>
                  <Typography className='text'>off</Typography>
                </Box>
              </Link>
            </React.Fragment>
          );
        })}
      </Box>
    </ThemeProvider>
  );
}

export default RetailerCoupon;
