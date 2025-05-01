import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NumbersOutlined } from '@mui/icons-material';

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
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                      delay: 1200,
                      disableOnInteraction: false,
                    }}
                    speed={1500}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {[1, 2, 3]?.map((num, index) => {return <SwiperSlide className="frame" key={index}>
                      <Box className="outer-frame">
                          <Box className="inner-frame">
                              <Box component='img' src='' alt='img' className="img"/>
                          </Box>
                      </Box>
        
                      <Box className="details">
                          <Box className="group">
                            <Typography className="heading">Time : </Typography>
                            <Typography className="description">{(new Date()).toLocaleString()}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Location : </Typography>
                            <Typography className="description">{(new Date()).toLocaleString()}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Engagement : </Typography>
                            <Typography className="description">{num}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Status : </Typography>
                            <Typography className="description">Public</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Purpose : </Typography>
                            <Typography className="description">-</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Rules and Description : </Typography>
                            <Typography className="description"> - </Typography>
                          </Box>
                      </Box>
                    </SwiperSlide> })}
                  </Swiper>
                  </Box>
            </Box>
      </Box>
    </Box>
  );
}

export default JoinEventsLocation;
