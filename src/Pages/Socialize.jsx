import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../Components/Home/Button2';
import paint_stroke from '../Utils/images/Socialize/paint_stroke.webp';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../Utils/audio/horn-sound.mp3';
import { useSelector } from 'react-redux';
import UserBadge from '../UserBadge';

function Socialize() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  // const [userIcon, setUserIcon] = useState(null);



  return (
    <Box className="socialize_wrapper">
      <Box className="row">
        <Box className="col">
          <Box></Box>
          <Box className="heading_col">
               <Typography className="heading" variant='h2'>Socialize</Typography> 
          </Box>
          <Box className="back-button-wrapper">
            <UserBadge
              handleLogoutClick="../../AmbarsariyaMall"
              handleBadgeBgClick={-1}
              handleLogin="login"
            />
          </Box>
        </Box>
        <Box className="col">
            <Box className="col_2">
                <Box className="item">
                  <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                  <Box className="title_container">
                    <Typography className='title'>Updates</Typography>
                  </Box>
                </Box>

                <Box className="item">
                  <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                  <Box className="title_container">
                    <Typography className='title'>Feeds</Typography>
                  </Box>
                </Box>
            </Box>
            <Box className="col-auto">
              <Link className="heading_col">
                <Typography className="heading" variant='h3'>Citizens</Typography> 
              </Link>
            </Box>

            <Box className="col_2">
                <Box className="item">
                  <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                  <Box className="title_container">
                    <Typography className='title'>Junction</Typography>
                  </Box>
                </Box>

                <Box className="item">
                  <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                  <Box className="title_container">
                    <Typography className='title'>Banners</Typography>
                  </Box>
                </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Socialize;
