import React from 'react'
import { Box, Typography } from '@mui/material'

function Date_Time_Weather({imgSrc, text1, text2}) {
    return (
        <Box className="date-time-and-weather-wrapper">
            <Box className="col-1">
                <Box component="img" src={imgSrc} className="calendarIcon" alt="calendar" />
            </Box>
            <Box className="col-2">
                <Typography className='day'>
                    {text1}
                </Typography>

                <Typography className='date'>
                    {text2}
                </Typography>
            </Box>
        </Box>
    )
}

export default Date_Time_Weather