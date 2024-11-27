import React from 'react'
import { Box, Typography } from '@mui/material'
import CircularText from '../Home/CircularText'
import Button2 from '../Home/Button2'

function BusinessHours({ data }) {

  // Convert time to 12-hour format
  function convertTo12HourFormat(time24) {
    if (!time24) return ''; // Return empty if time is undefined

    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours); // Convert to number

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12AM

    return `${hours}:${minutes} ${period}`;
  }

  // Get current time in 24-hour format (HH:MM)
  const currentTime = new Date().toTimeString().substring(0, 5);

  // Check if current time is between ontime and offtime
  const isOpen = data?.ontime && data?.offtime && currentTime >= data?.ontime && currentTime <= data?.offtime;

  return (
    <Box className="business_hours_container">
      <Button2 text="Back" redirectTo={`../support/shop?id=${data.shop_access_token}`} />
      <Box className="business_hours_wrapper">
        <CircularText text="Business Hours" />
        <Box className="h_line"></Box>
        <Typography className="status">{isOpen ? 'Open' : 'Closed'}</Typography>
        
        {/* Render business hours or fallback time */}
        <Typography className="time">
          {data?.ontime && data?.offtime
            ? `${convertTo12HourFormat(data.ontime)} - ${convertTo12HourFormat(data.offtime)}`
            : '00:00 - 00:00'}
        </Typography>
      </Box>
    </Box>
  )
}

export default BusinessHours
