import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Import navigation styles

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import wagah_border_amritsar from '../../Utils/images/Sell/support/wagah_border_amritsar.webp';
import nehru_shoppping_complex_amritsar from '../../Utils/images/Sell/support/nehru_shoppping_complex_amritsar.webp';
import trilium_mall_amritsar from '../../Utils/images/Sell/support/trilium_mall_amritsar.webp';
import mall_road_amritsar from '../../Utils/images/Sell/support/mall_road_amritsar.webp';
import hall_gate_amritsar from '../../Utils/images/Sell/support/hall_gate_amritsar.webp';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const cardData = [
  { title: 'Wagah Border', bgImage: wagah_border_amritsar },
  { title: 'Nehru Shopping Complex', bgImage: nehru_shoppping_complex_amritsar },
  { title: 'Trilium Mall', bgImage: trilium_mall_amritsar },
  { title: 'Mall Road', bgImage: mall_road_amritsar },
  { title: 'Hall Gate', bgImage: hall_gate_amritsar },
  { title: 'Hall Gate', bgImage: hall_gate_amritsar },
];

export default function Cards() {
  const navigate = useNavigate();
  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`../shops/${id}`);
  }

  return (
    <Box className="cards_outer_container">
      <Box className="cards_container">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 400,
            disableOnInteraction: false,
          }}
          speed={2000}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {cardData.map((card, index) => (
            <SwiperSlide key={index} className="card">
              <Link
                className="card-body"
                style={{ backgroundImage: `url(${card.bgImage})` }}
                onClick={(e) => { handleClick(e, card.title) }}
              >
                <Typography variant="h3">
                  <Typography variant="span">
                    {card.title}
                  </Typography>
                </Typography>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
