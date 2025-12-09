import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import dayjs from 'dayjs';

function DiscountPercentageSlider({ setOpenPopup, data }) {

  // Ensure `data` is treated as an array
  const coupons = Array.isArray(data) ? data : [data];

  // Filter out invalid data (null, undefined, or missing conditions)
  const validCoupons = coupons.filter(
    (coupon) => coupon && Array.isArray(coupon.conditions) && coupon.conditions.length > 0
  );

  // Helper function to render conditions dynamically
  const renderConditions = (conditions, couponType) => {
    // Find conditions based on their type
    const findCondition = (type) => conditions.find((cond) => cond.type === type)?.value || '';

    switch (couponType) {
      case 'retailer_upto': {
        const percentage = findCondition('percentage');
        const minimumOrder = findCondition('minimum_order');

        return (
          <>
            <Typography className="percent">{percentage}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              {minimumOrder && (
                <Typography className="text_3">Minimum order {minimumOrder}</Typography>
              )}
            </Box>
          </>
        );
      }

      case 'retailer_flat': {
        const percentage = findCondition('flat');
        const minimumOrder = findCondition('minimum_order');

        return (
          <>
            <Typography className="percent">{percentage}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              {minimumOrder && (
                <Typography className="text_3">Minimum order {minimumOrder}</Typography>
              )}
            </Box>
          </>
        );
      }

      case 'retailer_freebies': {
        const buy = findCondition('buy');
        const get = findCondition('get');

        return (
          <>
            <Typography className="percent">{buy}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">Buy</Typography>
              <Typography className="text_2">get {get}</Typography>
            </Box>
          </>
        );
      }

      case 'loyalty_unlock': {
        const unlockValue = findCondition('unlock');
        const lastPurchaseAbove = findCondition('last_purchase_above');

        return (
          <>
            <Typography className="percent">{unlockValue}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              {lastPurchaseAbove && (
                <Typography className="text_3">Min last purchase {lastPurchaseAbove}</Typography>
              )}
            </Box>
          </>
        );
      }

      case 'loyalty_bonus': {
        const flatPercent = findCondition('flat_percent');

        return (
          <>
            <Typography className="percent">{flatPercent}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              {/* <Typography className="text_3">Flat</Typography> */}
            </Box>
          </>
        );
      }

      case 'loyalty_prepaid': {
        const pay = findCondition('pay');
        const get = findCondition('get');

        return (
          <>
            <Typography className="percent" sx={{textTransform: 'lowercase', fontSize:'80px !important', marginRight: '5px'}}>Pay</Typography>
            <Box className="discount_details">
              <Typography className="text_1">{pay}</Typography>
              <Typography className="text_2">get {get}</Typography>
            </Box>
          </>
        );
      }

      case 'loyalty_by_customer': {
        const save = findCondition('save');

        return (
          <>
            <Typography className="percent">{save}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">save</Typography>
            </Box>
          </>
        );
      }

      case 'subscription_daily': {
        const percentOff = findCondition('percent_off');
        const subscriptionType = findCondition('subscription_daily') || 'Daily';

        return (
          <>
            <Typography className="percent">{percentOff}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              <Typography className="text_3">{subscriptionType}</Typography>
            </Box>
          </>
        );
      }

      case 'subscription_monthly': {
        const percentOff = findCondition('percent_off');
        const subscriptionType = findCondition('subscription_monthly') || 'Monthly';

        return (
          <>
            <Typography className="percent">{percentOff}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              <Typography className="text_3">{subscriptionType}</Typography>
            </Box>
          </>
        );
      }

      case 'subscription_weekly': {
        const percentOff = findCondition('percent_off');
        const subscriptionType = findCondition('subscription_weekly') || 'Weekly';

        return (
          <>
            <Typography className="percent">{percentOff}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              <Typography className="text_3">{subscriptionType}</Typography>
            </Box>
          </>
        );
      }

      case 'subscription_edit': {
        const percentOff = findCondition('percent_off');
        const subscriptionType = findCondition('subscription_edit') || 'Custom';

        return (
          <>
            <Typography className="percent">{percentOff}</Typography>
            <Box className="discount_details">
              <Typography className="text_1">%</Typography>
              <Typography className="text_2">off</Typography>
              <Typography className="text_3">{subscriptionType}</Typography>
            </Box>
          </>
        );
      }

      case 'special_discount': {
        const requestValue = findCondition('request');

        return (
          <>
            <Box className="discount_details">
              <Typography className="text_1">Special discount</Typography>
              <Typography className="text_2">{requestValue}</Typography>
            </Box>
          </>
        );
      }

      case 'sale_for_stock_clearance': {
        const price = findCondition('price') ;
        const dateRange = JSON.parse(findCondition('sale_for_stock_clearance_date_range'));
        const sku_no = findCondition('sku_no');
        const displayValue = `${dayjs(dateRange[0]).format('YYYY-MM-DD')} to ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;

        return (
          <>
            <Box className="discount_details">
              <Typography className="text_1">sale for stock clearance</Typography>
              <Typography className="text_3">price : <Typography className="text_2" variant="span">{price}</Typography> </Typography>
              <Typography className="text_3">valid : <Typography className="text_1" variant='span'>{displayValue}</Typography></Typography>
              <Typography className="text_3">sku no. : <Typography className="text_1" variant='span'>{sku_no}</Typography></Typography>
            </Box>
          </>
        );
      }

      case 'hot_sale': {
        const product_type = JSON.parse(findCondition('product_type')).join(', ');
        const discounted_price = findCondition('discounted_price') ;
        const dateRange = JSON.parse(findCondition('hot_sale_date_range'));
        const sale_price = findCondition('sale_price');
        const show_price = findCondition('show_price');
        const displayValue = `${dayjs(dateRange[0]).format('YYYY-MM-DD')} to ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;

        return (
          <>
            <Box className="discount_details">
              <Typography className="text_3">type : <Typography className="text_1" variant='span'>{product_type}</Typography></Typography>
              <Typography className="text_3">price : <Typography className="text_1" variant='span'>{show_price}</Typography> </Typography>
              <Typography className="text_3">sale price : <Typography className="text_1" variant='span'>{sale_price}</Typography></Typography>
              <Typography className="text_3">discounted price : <Typography className="text_1" variant='span'>{discounted_price}</Typography></Typography>
              <Typography className="text_3">valid : <Typography className="text_1" variant='span'>{displayValue}</Typography>
                </Typography>
            </Box>
          </>
        );
      }

      case 'festivals_sale': {
        const festivalName = findCondition('festival_name') || 'Festival';
        const dateRange = JSON.parse(findCondition('festivals_sale_date_range'));
        const offer = findCondition('offer');
        const displayValue = `${dayjs(dateRange[0]).format('YYYY-MM-DD')} to ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`;

        return (
          <>
            <Box className="discount_details">
              <Typography className="text_1">{festivalName} Sale</Typography>
              <Typography className="text_3">offer : <Typography className="text_2" variant='span'>{offer}</Typography> </Typography>
              <Typography className="text_3">valid : <Typography className="text_1" variant='span'>{displayValue}</Typography></Typography>
            </Box>
          </>
        );
      }

      default:
        return (
          <Typography className="text_3">
            No details available for this coupon type.
          </Typography>
        );
    }
  };

  return (
    <Swiper
      effect={'cube'}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={false}
      modules={[EffectCube, Pagination, Autoplay]}
      className="mySwiper"
      loop={false}
    >
      {validCoupons.map((couponItem, couponIndex) => (
        <SwiperSlide key={couponIndex}>
          <Box
            className="discount_percentage"
            onClick={() => {
              setOpenPopup && setOpenPopup(true);
            }}
          >
            {renderConditions(couponItem.conditions, couponItem.coupon_type)}
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DiscountPercentageSlider;
