import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

function CouponsSlider() {
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
        loop={true}
        autoplay={{
            delay: 400,
            disableOnInteraction: false,
          }}
        speed={2000}
      >
        <SwiperSlide>
          <Box className="discount_coupon">
            <Typography className='coupon'>coupon</Typography>
            <Typography className='coupon_value'>Retailer</Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
        <Box className="discount_coupon">
            <Typography className='coupon'>coupon</Typography>
            <Typography className='coupon_value'>Loyalty</Typography>
          </Box>
        </SwiperSlide>
      </Swiper>
  
  )
}

export default CouponsSlider