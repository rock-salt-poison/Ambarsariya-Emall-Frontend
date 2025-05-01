import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../Components/Serve/SupplyChain/Header';
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';
import CreateEventForm from '../../Components/Sell/Esale/Locations/CreateEventForm';


function CreateEventsLocation() {
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
    <Box className='member_location_create_event_wrapper'>
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
          <Box className="form_container">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
                <CreateEventForm />
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateEventsLocation;
