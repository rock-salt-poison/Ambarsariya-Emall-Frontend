import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { Link, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { get_support_page_famous_areas } from '../../API/fetchExpressAPI';


export default function VerticalCards() {
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
          slidesPerView={"auto"}
          spaceBetween={10}
          direction={'vertical'}
          mousewheel={true}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={2350}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {cardData.map((card, index) => (
            <SwiperSlide key={index} className="card swiper_card" >
              <Typography variant="h3">
                  <Typography variant="span">
                    {card.area_title}
                  </Typography>
                </Typography>
              <Link
                className="card-body"
                style={{ backgroundImage: `url(${card.image_src})` }}
                onClick={(e) => { handleClick(e, card.access_token) }}
              >
                
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
