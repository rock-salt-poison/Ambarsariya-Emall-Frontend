import React from 'react'
import notification_icon from '../../../Utils/images/Sell/user_portfolio/notification_icon.svg'
import { Box, Typography } from '@mui/material'

function Notification({text, number}) {
  return (
   <Box className="notification">
      <Box className="icon_container">
        <Box component="img" src={notification_icon} className="notification_icon" alt="notification_icon"/>
        <span className="number">{number}</span>
      </Box>
      <Typography className="text">{text}</Typography>
   </Box>
  )
}

export default Notification