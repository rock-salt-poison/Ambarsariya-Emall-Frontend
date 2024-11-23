import React from 'react'
import { Box, Typography } from '@mui/material';
import batteryImg from '../../../Utils/images/battery.png';
import sunriseIcon from '../../../Utils/images/sunriseicon.webp';

function Cube({time, temp}) {

    if (!time) return null;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dayName = days[time.getDay()];
    return (
        <Box className="scene">
            <Box className="cube">
                <Box className="cube__face cube__face--front">
                    <Box className="container">
                        <Box className="row1">
                            <Box component='img' src={batteryImg} className='batteryImg' />
                            <Typography>
                                {dayName}
                            </Typography>
                            <Box component='img' src={sunriseIcon} className='sunriseIcon' />
                        </Box>
                        <Box className="row2">
                            <Typography>
                                {formattedTime}
                            </Typography>
                        </Box>
                        <Box className="row3">
                            <Typography>
                                {temp}&deg;c
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="cube__face cube__face--right">
                    <Box className='circle'></Box>
                </Box>
                <Box className="cube__face cube__face--top"></Box>
            </Box>
        </Box>
    )
}

export default Cube