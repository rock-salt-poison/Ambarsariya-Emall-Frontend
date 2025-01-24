import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

function CouponsSlider({ data, onActiveCouponChange }) {
  // Flatten the data into a single array of coupons with their category
  const flattenedCoupons = data.flatMap((category) =>
    category.coupons.map((coupon) => ({
      ...coupon,
      discount_category: category.discount_category,
    }))
  );

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
      loopAdditionalSlides={flattenedCoupons.length}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      speed={1000}
      onSlideChange={(swiper) => {
        const activeIndex = swiper.realIndex; // Get the actual index of the active slide
        const activeCoupon = flattenedCoupons[activeIndex];
        if (activeCoupon) {
          onActiveCouponChange(activeCoupon); // Set the active coupon
        }
      }}
      
    >
      {flattenedCoupons?.map((couponItem, index) => (
        <SwiperSlide key={index}>
          <Box className="discount_coupon">
            <Typography className="coupon">Coupon</Typography>
            <Typography className="coupon_value">
              {couponItem.discount_category}
            </Typography>
            <Typography className="coupon_type">
              {(couponItem.coupon_type)?.replace('_', ' ')}
            </Typography>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CouponsSlider;
