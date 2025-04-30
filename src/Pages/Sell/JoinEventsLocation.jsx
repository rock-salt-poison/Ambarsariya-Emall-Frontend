import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

function JoinEventsLocation() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  const handleClick = async (e, type) => {
    if(type){
      e.preventDefault();
      const target = e.target.closest(".card");
      if(target){
          target.classList.toggle('reduceSize3');
          audio.play();
          
          setTimeout(()=>{
              target.classList.toggle('reduceSize3');
          },300)
  
          setTimeout(()=>{
              if(type==='Join'){
                navigate('../esale/locations/events/join')
              } else if(type==='Create'){
                navigate('../esale/locations/events/create')
              }
          }, 600)
      }
    }
  }

  return (
    <Box className='member_location_join_event_wrapper'>
      <Box className="row">
        <Box className="col header_badge">
          <Box className="heading_container">
            <Typography className="title">Join</Typography>
          </Box>
          <Box className="title_container">
              <Link to='../../AmbarsariyaMall/sell/esale/locations/events'>
                <Typography className="title">events</Typography>
              </Link>
          </Box>

          <UserBadge
              handleBadgeBgClick="../esale/locations/events"
              handleLogin="../login"
              handleLogoutClick="../../AmbarsariyaMall"
          />
        </Box>

         <Box className="col">
            <Box className="container">
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
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide className="frame">
                      <Box className="outer-frame">
                          <Box className="inner-frame">
                              <Box component='img' src='' alt='img' className="img"/>
                          </Box>
                      </Box>
        
                      <Box className="details">
                        
                      </Box>
                    </SwiperSlide>
                  </Swiper>
                  </Box>
            </Box>
      </Box>
    </Box>
  );
}

export default JoinEventsLocation;
