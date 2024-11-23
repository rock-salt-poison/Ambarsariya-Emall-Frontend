// CustomClockIcon.js
import React from 'react';
import { IconButton } from '@mui/material';
import customClock from '../../Utils/images/clock.webp'; // Adjust the path to your custom SVG

const CustomClockIcon = (props) => {
  return (
    <IconButton {...props}>
      <img src={customClock} alt="Custom Clock" style={{ width: 24, height: 24 }} />
    </IconButton>
  );
};

export default CustomClockIcon;
