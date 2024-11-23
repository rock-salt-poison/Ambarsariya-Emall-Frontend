import React from 'react'
import { Box, Typography } from '@mui/material'
import clockPageNeonBg from '../../../Utils/images/clock-page-neon-shadow.png';

function TravelNeeds({ optionalButton, text }) {
    return (
        <Box className="travelWrapper">
            <Box component="img" src={clockPageNeonBg} className="neonBorderImg" alt="neon-border" />

            <Box className="travelRow">
                <Typography variant='h3'>
                    {text}
                </Typography>
                {optionalButton}
            </Box>
        </Box>
    )
}

export default TravelNeeds