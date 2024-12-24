import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import Board from '../../Components/CouponOffering/Board';
import boardImg from '../../Utils/images/Sell/coupon_offering_page/board.svg';
import Offers from '../../Components/CouponOffering/Offers';
import { useNavigate } from 'react-router-dom';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import RetailerPopupContent from '../../Components/CouponOffering/RetailerPopupContent';
import LoyaltyPopupContent from '../../Components/CouponOffering/LoyaltyPopupContent';
import SubscriptionPopupContent from '../../Components/CouponOffering/SubscriptionPopupContent';
import CustomizablePopupContent from '../../Components/CouponOffering/CustomizablePopupContent';
import RsTenPerDayContent from '../../Components/CouponOffering/RsTenPerDayContent';
import { useSelector } from 'react-redux';

const OFFER_TYPES = [
  { type: 'retailer', popup: true, popup_body_content: <RetailerPopupContent /> },
  { type: 'subscription', popup: true, popup_body_content: <SubscriptionPopupContent /> },
  { type: 'loyalty', popup: true, popup_body_content: <LoyaltyPopupContent /> },
  { type: 'customizable', popup: true, popup_body_content: <CustomizablePopupContent /> },
  { type: 'Rs 10/per day', popup: true, popup_body_content: <RsTenPerDayContent />, optionalCName:'rs_per_day' }
];

function CouponOfferingPage(props) {
  const MAX_HEIGHT = 300;
  const [graphHeights, setGraphHeights] = useState(
    OFFER_TYPES.reduce((acc, offer) => ({ ...acc, [offer.type]: 0 }), {})
  );
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [rsPerDay, setRsPerDay] = useState(0);

  const retailerCoupon = useSelector((state) => state.coupon.retailer);
  const loyaltyCoupon = useSelector((state) => state.coupon.loyalty);
  const subscriptionCoupon = useSelector((state) => state.coupon.subscription);
  const customizableCoupon = useSelector((state) => state.coupon.customizable);

  // Map checked coupons to increase height
  const calculateHeights = () => {
    let updatedHeights = { ...graphHeights };

    // Calculate retailer height
    if (retailerCoupon) {
      const retailerCheckedCount = Object.values(retailerCoupon.discounts)
        .filter(discount => discount.checked).length;
      updatedHeights['retailer'] = Math.min(retailerCheckedCount * 20, MAX_HEIGHT);
    }

    // Calculate subscription height
    if (subscriptionCoupon) {
      const subscriptionCheckedCount = Object.values(subscriptionCoupon.discounts)
        .filter(discount => discount.checked).length;
      updatedHeights['subscription'] = Math.min(subscriptionCheckedCount * 20, MAX_HEIGHT);
    }

    // Calculate loyalty height
    if (loyaltyCoupon) {
      const loyaltyCheckedCount = Object.values(loyaltyCoupon.discounts)
        .filter(discount => discount.value_1 && discount.value_1 !== "").length;
      updatedHeights['loyalty'] = Math.min(loyaltyCheckedCount * 20, MAX_HEIGHT);
    }

    // Calculate customizable height (this could be more complex if there are more conditions)
    if (customizableCoupon) {
      const discountsValues = Object.values(customizableCoupon.discounts || {});
      
      // If needed, calculate the count of valid discounts
      const validDiscounts = discountsValues.filter(
        discount => discount.checked 
      );
          
      // Update heights
      updatedHeights['customizable'] = Math.min(validDiscounts.length * 20, MAX_HEIGHT);
      console.log('Updated Heights:', updatedHeights);
    }
    

    // Update total height
    const newTotal = Object.values(updatedHeights).reduce((acc, height) => acc + height, 0);
    setTotal(newTotal);

    setGraphHeights(updatedHeights);
  };

  useEffect(() => {
    calculateHeights();
  }, [retailerCoupon, loyaltyCoupon, subscriptionCoupon, customizableCoupon]);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--text-color-light)',
    textColor: props.textColor || 'black',
    scrollbarThumb: 'var(--brown)'
  };

  const theme = createCustomTheme(themeProps);

  const handleClick = (e, type) => {
    const offerBox = e.target.closest('.offer_box');
    const rs_per_day = e.target.closest('.rs_per_day');
    const makeAWish = e.target.closest('.make_a_wish');

    if (offerBox) {
      offerBox.classList.add('reduceSize3');

      setTimeout(() => {
        offerBox.classList.remove('reduceSize3');
        if (makeAWish) {
          setTimeout(() => navigate('../book-eshop'), 600);
        }
      }, 300);

      // if (!makeAWish && !rs_per_day) {
      //   setGraphHeights((prevHeights) => {
      //     const newHeight = prevHeights[type] + 25;
      //     const updatedHeight = newHeight <= MAX_HEIGHT ? newHeight : MAX_HEIGHT;

      //     const updatedHeights = {
      //       ...prevHeights,
      //       [type]: updatedHeight,
      //     };

      //     const newTotal = Object.values(updatedHeights).reduce((acc, height) => acc + height, 0);
      //     setTotal(newTotal);
      //     return updatedHeights;
      //   });
      // }

      if (rs_per_day && rsPerDay < 10) {
        setRsPerDay(10);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="coupon_offering_wrapper">
        <Box className="row">
          <Box className="col">
            <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />

            <Box className="header_board">
              <Board text="E-shop" imgSrc={boardImg} />
              <Board text="coupons offering" imgSrc={boardImg} />
              <Board text="emboss brand" imgSrc={boardImg} />
            </Box>
          </Box>

          <Box className="col">
            {OFFER_TYPES.map(({ type, popup, popup_body_content, optionalCName }) => (
              <Offers
                key={type}
                text={type}
                popup={popup}
                popup_body_content={popup_body_content}
                onClick={(e) => handleClick(e, type)}
                optionalCname={optionalCName}
              />
            ))}
          </Box>

          <Box className="col">
            <Box className="graph_container">
              {OFFER_TYPES.slice(0, -1).map(({ type }) => (
                <Box
                  key={type}
                  className={`${type}_graph`}
                  style={{ height: `${graphHeights[type]}px`, maxHeight: '100%' }}
                  onClick={(e) => handleClick(e, type)}
                >
                  <Typography className="percentage">{graphHeights[type]}</Typography>
                </Box>
              ))}
            </Box>
            <Typography className="total">
              Total= {total}
              <Typography variant="span"> + </Typography>{rsPerDay} ₹ per day
            </Typography>
            <Offers
              text="make a wish"
              optionalCname="make_a_wish"
              onClick={(e) => handleClick(e)}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CouponOfferingPage;
