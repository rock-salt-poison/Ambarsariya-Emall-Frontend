import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function Calendar({ display }) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = midnight - now;

    const timeout = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 1000 * 60 * 60 * 24); // Set interval to update every 24 hours
    }, timeUntilMidnight);

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);

  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <Box className='calendarBorder'>
      <Box className="vectors">
        <Box className="vector"></Box>
        <Box className="vector"></Box>
        <Box className="vector"></Box>
      </Box>

      <Box className="date">
        <Typography component='p'>
          {display === 'dateMonth' ? date : 'Since'}
        </Typography>
      </Box>

      <Box className="month">
        <Typography component='p'>
          {display === 'dateMonth' ? month : year}
        </Typography>
      </Box>
    </Box>
  );
}

export default Calendar;
