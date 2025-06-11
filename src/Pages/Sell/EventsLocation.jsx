import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../Components/Serve/SupplyChain/Header';
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';

function EventsLocation() {
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
    <Box className='member_location_events_wrapper'>
      <Box className="row">
        <Box className="col header_badge">
          <Box className="title_container">
              <Link to='../../sell/esale/locations'>
                <Typography className="title">events</Typography>
              </Link>
          </Box>
          <Box></Box>

          <UserBadge
              handleBadgeBgClick="../esale/locations"
              handleLogin="../login"
              handleLogoutClick="../../"
          />
        </Box>

        <Box className="col">
          <Box className="container">
              {['Join', 'Create']?.map((type, index)=>{
                return <Link className="card" key={index} onClick={(e)=> handleClick(e, type)}>
                  <Typography className="title">{type}</Typography>
                </Link> 
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EventsLocation;
