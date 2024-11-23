// src/components/Button2.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';

function Button2({ redirectTo, text, optionalcName, handleClose, onClick }) {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.target.parentElement.classList.add('reduceSize3');
    setTimeout(() => {
      e.target.parentElement.classList.remove('reduceSize3');
      if (handleClose) handleClose(); // Close the popup
      if (onClick) onClick(); // Additional actions
      navigate(redirectTo); // Navigate to the redirectTo route
    }, 300);
    audio.play();
  };

  return (
    <Box className={`backButton ${optionalcName ? optionalcName : ''}`}>
      <Link onClick={(e) => { handleClick(e) }}>
        <Typography>
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

export default Button2;
