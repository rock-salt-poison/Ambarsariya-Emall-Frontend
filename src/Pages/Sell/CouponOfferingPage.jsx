import React, { useState } from 'react';
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

const OFFER_TYPES = [
  { type: 'retailer', popup: true, popup_body_content: <RetailerPopupContent /> },
  { type: 'subscription', popup: true, popup_body_content: <SubscriptionPopupContent /> },
  { type: 'loyalty', popup: true, popup_body_content: <LoyaltyPopupContent /> },
  { type: 'customizable', popup: true, popup_body_content: <CustomizablePopupContent /> }
];

// Define a max height as a numeric value, e.g., in pixels or percentage points (100%)

function CouponOfferingPage(props) {
  const MAX_HEIGHT = 300;
  const [graphHeights, setGraphHeights] = useState(
    OFFER_TYPES.reduce((acc, offer) => ({ ...acc, [offer.type]: 0 }), {})
  );
  const navigate = useNavigate();

  const [total, setTotal] =useState(0);
  const [rsPerDay, setRsPerDay] =useState(0);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--text-color-light)',
    textColor: props.textColor || 'black', // Defaulting text color for safety
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
      // Prevent updates if the total exceeds MAX_HEIGHT
      
      if(!makeAWish && !rs_per_day){
        if (total >= MAX_HEIGHT) return;
  
      setGraphHeights((prevHeights) => {
        const newHeight = prevHeights[type] + 25; // Increase height by 25px
        const updatedHeight = newHeight <= MAX_HEIGHT ? newHeight : MAX_HEIGHT;
        
        const updatedHeights = {
          ...prevHeights,
          [type]: updatedHeight,
        };
        
        // Calculate the new total height
        const newTotal = Object.values(updatedHeights).reduce((acc, height) => acc + height, 0);
        
        setTotal(newTotal);
        return updatedHeights;
      });
      }
      if(rs_per_day && rsPerDay < 10){
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
            {OFFER_TYPES.map(({ type, popup, popup_body_content }) => (
              <Offers
                key={type}
                text={type}
                popup={popup}
                popup_body_content={popup_body_content}
                onClick={(e) => handleClick(e, type)}
              />
            ))}
            <Offers text="Rs 10/per day" onClick={(e) => handleClick(e)} optionalCname={"rs_per_day"} />
          </Box>

          <Box className="col">
            <Box className="graph_container">
              {OFFER_TYPES.map(({ type }) => (
                <Box
                  key={type}
                  className={`${type}_graph`}
                  style={{ height: `${graphHeights[type]}px`, maxHeight:'100%' }}
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
