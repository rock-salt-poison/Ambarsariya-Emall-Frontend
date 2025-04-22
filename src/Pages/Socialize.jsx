import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../Components/Home/Button2';
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
        <Box className="back-button-wrapper">
        <UserBadge
          handleLogoutClick="../../AmbarsariyaMall"
          handleBadgeBgClick={-1}
          handleLogin="login"
        />

        </Box>
        <Box className="container">
          
        </Box>
      </Box>
    </Box>
  );
}

export default Socialize;
