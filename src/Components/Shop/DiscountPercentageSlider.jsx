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

function DiscountPercentageSlider({setOpenPopup}) {
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
            <Link className="discount_percentage" onClick={(e)=>{setOpenPopup(true)}}>
                <Typography className='percent'>11</Typography>
                <Box className="discount_details">
                <Typography className='text_1'>%</Typography>
                <Typography className='text_2'>off</Typography>
                <Typography className='text_3'>min purchase 1000</Typography>
                </Box>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link className="discount_percentage" onClick={(e)=>{setOpenPopup(true)}}>
                <Typography className='percent'>11</Typography>
                <Box className="discount_details">
                <Typography className='text_1'>%</Typography>
                <Typography className='text_2'>off</Typography>
                <Typography className='text_3'>min purchase 1000</Typography>
                </Box>
            </Link>
        </SwiperSlide>
      </Swiper>
  
  )
}

export default DiscountPercentageSlider