import React from 'react'
import { Box, Typography } from '@mui/material'

function RoutineCardHeader({text, routineText}) {
  return (
    <Box className="header">
        <Typography className="title" variant="h3">
            {text}
        </Typography>

        {routineText=="true" && 
          <Box className="heading">
              <Typography className="text1">Daily</Typography>
              <Typography className="text2">Routine</Typography>
          </Box>
        }
    </Box>
  )
}

export default RoutineCardHeader