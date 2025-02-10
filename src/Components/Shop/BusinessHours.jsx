import React from 'react';
import { Box, Typography } from '@mui/material';
import CircularText from '../Home/CircularText';
import Button2 from '../Home/Button2';
import UserBadge from '../Userbadge';

function BusinessHours({ data }) {

  // Convert time to 12-hour format for display purposes
  const convertTo12HourFormat = (time24) => {
    if (!time24) return '';
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hours}:${minutes} ${period}`;
  };

  // Check if current time is within the business hours
  const isOpen = () => {
    if (!data?.ontime || !data?.offtime) return false;

    const now = new Date();

    // Convert ontime and offtime to Date objects
    const [onHour, onMinute] = data.ontime.split(':').map(Number);
    const [offHour, offMinute] = data.offtime.split(':').map(Number);

    const onTime = new Date();
    const offTime = new Date();

    // Set ontime and offtime as Date objects
    onTime.setHours(onHour, onMinute, 0, 0);
    offTime.setHours(offHour, offMinute, 0, 0);

    // Handle overnight hours (i.e., offtime is on the next day)
    if (offTime < onTime) {
      offTime.setDate(offTime.getDate() + 1); // Move offtime to the next day
    }

    // Check if current time is within the business hours
    return now >= onTime && now <= offTime;
  };

  return (
    <Box className="business_hours_container">
      {/* <Button2 text="Back" redirectTo={`../support/shop?token=${data.shop_access_token}`} /> */}
      {/* <Button2 text="Back" redirectTo={-1} /> */}
      <UserBadge
          handleBadgeBgClick={`../support/shop?token=${data.shop_access_token}`}
          handleLogin="../login"
          handleLogoutClick="../../AmbarsariyaMall"
      />
      <Box className="business_hours_wrapper">
        <CircularText text="Business Hours" />
        <Box className="h_line"></Box>
        <Typography className="status">{isOpen() ? 'Open' : 'Closed'}</Typography>

        {/* Render business hours or fallback time */}
        <Typography className="time">
          {data?.ontime && data?.offtime
            ? `${convertTo12HourFormat(data.ontime)} - ${convertTo12HourFormat(data.offtime)}`
            : '00:00 - 00:00'}
        </Typography>
      </Box>
    </Box>
  );
}

export default BusinessHours;
