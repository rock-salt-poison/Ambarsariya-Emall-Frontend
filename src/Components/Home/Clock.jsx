import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import clockImg from '../../Utils/images/clock.webp';
import hourHand from '../../Utils/images/hour-hand.png';
import minuteHand from '../../Utils/images/minute_hand.png';
import secondHand from '../../Utils/images/second-hand.webp';

const Clock = ({handleClick}) => {


  useEffect(() => {
    const updateClock = () => {
      const dateInfo = new Date();
      const hr = dateInfo.getHours() > 12 ? dateInfo.getHours() - 12 : dateInfo.getHours();
      const min = dateInfo.getMinutes();
      const sec = dateInfo.getSeconds();
      const milsec = dateInfo.getMilliseconds();

      const hrAngle = hr * 30 + (min * 6) / 12;
      const minAngle = min * 6 + (sec * 6) / 60;
      const secAngle = sec * 6 + (milsec * 0.36) / 1000;

      setAngle('hr-wrapper', hrAngle);
      setAngle('min-wrapper', minAngle);
      setAngle('sec-wrapper', secAngle);
    };

    const setAngle = (wrapper, angle) => {
      const element = document.querySelector(`.${wrapper} .hand`);
      if (element) {
        element.style.transform = `rotate(${angle}deg)`;
      }
    };

    // Initial call to set the clock's position
    updateClock();

    // Update clock every second
    const interval = setInterval(updateClock, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);



  return (
    <Link className='clockParent' onClick={handleClick}>
      <Box component="img" src={clockImg} className="clockImg" alt="Clock background" />

      <Box className="wrapper">
        <Box className="sub-wrapper">
          <Box className="hr-wrapper">
            {/* <Box component="img" src={hourHand} className="hand hr" alt="Hour hand" /> */}
            <Box className="hand hr"></Box>
          </Box>
          <Box className="min-wrapper">
            {/* <Box component="img" src={minuteHand} className="hand min" alt="Minute hand" /> */}
            <Box className="hand min"></Box>
          </Box>
          <Box className="sec-wrapper">
            {/* <Box component="img" src={secondHand} className="hand sec" alt="Second hand" /> */}
            <Box className="hand sec" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Clock;
