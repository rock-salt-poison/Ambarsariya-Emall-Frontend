import React from 'react'
import { Box, Typography } from '@mui/material'
import CircularText from '../Home/CircularText'
import Button2 from '../Home/Button2'


function BusinessHours() {
  return (
    <Box className="business_hours_container">
            <Button2 text="Back" redirectTo="../support/stationary" />
        <Box className="business_hours_wrapper">
            <CircularText text="Business Hours"/>
            <Box className="h_line"></Box>
            <Typography className='status'>Open</Typography>
            <Typography className='time'>9:00 AM - 10:00 PM</Typography>
        </Box>
    </Box>
  )
}

export default BusinessHours