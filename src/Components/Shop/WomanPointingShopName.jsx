import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Calendar from '../Home/AQIPopupComponents/Calendar';
import woman_pointing_down from '../../Utils/images/Sell/shop_details/woman_pointing_down.webp';
import { Link } from 'react-router-dom';
import VideoPopup from './VideoPopup'; // Import the VideoPopup component

function WomanPointingShopName() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="woman_pointing_shop_name">
      <Box className="shop_container2">
        <Box component="img" src={woman_pointing_down} className='icon' />
        <Link className="shop_name" onClick={handleClickOpen}>
          <Typography>Click here to view the live video</Typography>
        </Link>
      </Box>
      <Box className="calendar">
        <Calendar display="sinceYear" />
      </Box>
      <VideoPopup open={open} handleClose={handleClose} />
    </Box>
  );
}

export default WomanPointingShopName;
