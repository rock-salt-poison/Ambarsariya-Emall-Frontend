import React, { useEffect, useState } from 'react';
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
import { Box, CircularProgress, Typography } from '@mui/material';
import { get_support_page_famous_areas } from '../../API/fetchExpressAPI';

// const cardData = [
//   { title: 'Wagah Border', bgImage: wagah_border_amritsar },
//   { title: 'Nehru Shopping Complex', bgImage: nehru_shoppping_complex_amritsar },
//   { title: 'Trilium Mall', bgImage: trilium_mall_amritsar },
//   { title: 'Mall Road', bgImage: mall_road_amritsar },
//   { title: 'Hall Gate', bgImage: hall_gate_amritsar },
//   { title: 'Hall Gate', bgImage: hall_gate_amritsar },
// ];


export default function Cards() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`../support/shops-near?q=${id}`);
  }

  useEffect(()=>{
    const fetchData  = async () => {
      try{
        setLoading(false);

        const resp = await get_support_page_famous_areas();
        // console.log(resp);
        setCardData(resp);
      }catch(e){

      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  return (
    <Box className="cards_outer_container">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="cards_container">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          speed={1500}
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
                style={{ backgroundImage: `url(${card.image_src})` }}
                onClick={(e) => { handleClick(e, card.access_token) }}
              >
                <Typography variant="h3">
                  <Typography variant="span">
                    {card.area_title}
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
