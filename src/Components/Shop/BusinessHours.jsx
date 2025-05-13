import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CircularText from '../Home/CircularText';
import Button2 from '../Home/Button2';
import UserBadge from '../../UserBadge';
import Switch_On_Off2 from '../Form/Switch_On_Off2';

function BusinessHours({ data }) {
  const [overrideOpen, setOverrideOpen] = useState(null); // null = auto, true/false = manual override

  // Convert time to 12-hour format
  const convertTo12HourFormat = (time24) => {
    if (!time24) return '';
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  // Calculate auto open/closed based on current time
  const isCurrentlyOpen = () => {
    if (!data?.ontime || !data?.offtime) return false;

    const now = new Date();
    const [onHour, onMinute] = data.ontime.split(':').map(Number);
    const [offHour, offMinute] = data.offtime.split(':').map(Number);

    const onTime = new Date();
    const offTime = new Date();

    onTime.setHours(onHour, onMinute, 0, 0);
    offTime.setHours(offHour, offMinute, 0, 0);

    if (offTime < onTime) {
      offTime.setDate(offTime.getDate() + 1);
    }

    return now >= onTime && now <= offTime;
  };

  // Final open status with override logic
  const isOpen = overrideOpen !== null ? overrideOpen : isCurrentlyOpen();

  return (
    <Box className="business_hours_container">
      <UserBadge
        handleBadgeBgClick={`../support/shop?token=${data.shop_access_token}`}
        handleLogin="../login"
        handleLogoutClick="../../AmbarsariyaMall"
      />
      <Box className="business_hours_wrapper">
        <CircularText text="Business Hours" />
        <Box className="h_line"></Box>


        <Box className="open_close">
          <Typography className="status">{isOpen ? 'Open' : 'Closed'}</Typography>

          <Switch_On_Off2
            checked={isOpen}
            onChange={(e) => setOverrideOpen(e.target.checked)}
          />
        </Box>

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
