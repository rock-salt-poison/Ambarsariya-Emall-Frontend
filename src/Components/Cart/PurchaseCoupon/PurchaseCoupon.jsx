import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import retailer_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/retailer_coupon.webp';
import subscription_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/subscription_coupon.webp';
import loyalty_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/loyalty_coupon.webp';
import customizable_coupon from '../../../Utils/images/Sell/cart/purchase_coupon/customizable_coupon.webp';
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup';
import { Link } from 'react-router-dom';
import RetailerCoupon from './RetailerCoupon'; // Import RetailerCoupon

function PurchaseCoupon() {
  const themeProps = {
    scrollbarThumb: 'var(--brown)',
    popoverBackgroundColor: '#f8e3cc',
  };

  const theme = createCustomTheme(themeProps);
  const [openPopup, setOpenPopup] = useState(null);
  const [selectedCouponData, setSelectedCouponData] = useState(null); // Store selected coupon data

  const handleClose = () => {
    setOpenPopup(false);
    setSelectedCouponData(null); // Reset selected coupon data on close
  };

  const handleClick = (coupon) => {
    setOpenPopup((prev) => (prev === coupon.id ? null : coupon.id));
    setSelectedCouponData(coupon); // Set the selected coupon's data
  };

  const coupons = [
    { id: 1, alt: "retailer_coupon", title: "Retailer Coupons", imgSrc: retailer_coupon, discount_percentage: '40' },
    { id: 2, alt: "subscription_coupon", title: "Subscription Coupons", imgSrc: subscription_coupon, discount_percentage: '50' },
    { id: 3, alt: "loyalty_coupon", title: "Loyalty Coupons", imgSrc: loyalty_coupon, discount_percentage: '60' },
    { id: 4, alt: "customizable_coupon", title: "Customizable Coupons", imgSrc: customizable_coupon, discount_percentage: '70' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="title_container">
        <Typography className="title">Purchase Coupons</Typography>
      </Box>
      <Box className="body_container">
        {coupons.map((coupon) => (
          <React.Fragment key={coupon.id}>
            <Link 
              onClick={() => handleClick(coupon)} 
              style={{ textDecoration: 'none', cursor: 'pointer' }} // Optional: Add styles for better UX
            >
              <Box component="img" className="coupon" alt={coupon.alt} src={coupon.imgSrc} />
            </Link>
            <CardBoardPopup
              customPopup={true}
              open={openPopup === coupon.id}
              handleClose={handleClose}
              body_content={<RetailerCoupon selectedCoupon={selectedCouponData} />} // Pass selected coupon data
              optionalCName="purchase_coupon_offer_popup coupons"
            />
          </React.Fragment>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default PurchaseCoupon;
