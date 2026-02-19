import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserBadge from '../../UserBadge'
import city_hoardings from '../../Utils/gifs/city_hoardings.gif'
import road_rage_banner from '../../Utils/gifs/road_rage_banner.gif'
import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../../Utils/audio/horn-sound.mp3'

function BannersMain() {
  const navigate = useNavigate();
  const [audio] = useState(new Audio(hornSound));

  const cards = [
    {id:1, label:'City Hoardings', src:city_hoardings, alt:'city-hoardings', cName:'card city_hoarding'},
    {id:2, label:'Road Rage Banners', src:road_rage_banner, alt:'road-rage-banner', cName:'card road_rage_banner'},
  ];

  const handleHeadingClick = (e) => {
    e.preventDefault();
    const headingContainer = e.target.closest('.heading_container');
    if (headingContainer) {
      headingContainer.classList.add('reduceSize3');
      audio.play();
      
      setTimeout(() => {
        headingContainer.classList.remove('reduceSize3');
      }, 300);
      
      setTimeout(() => {
        navigate('../'); // Navigate to socialize main page (change this path as needed)
      }, 1000);
    }
  };
  
  return (
    <Box className="banner_main_wrapper">
      <Box className="row">
        <Box className="col back_button">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Link className="col heading_container" onClick={handleHeadingClick}>
          <Typography className="heading" variant="h2">Banners Today</Typography>
        </Link>
      </Box>

      <Box className="row">
        <Box className="col card_container">
          {cards && cards?.map((card)=>(<Box key={card?.id} className={card.cName}>
            <Link className="label_container">
              <Typography className="label">{card?.label}</Typography>
            </Link>
          </Box>))}
        </Box>
      </Box>
    </Box>
  )
}

export default BannersMain