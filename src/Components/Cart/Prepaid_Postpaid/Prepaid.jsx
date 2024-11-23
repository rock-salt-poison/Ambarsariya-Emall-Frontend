import React from 'react'
import { Box, Button, Typography } from '@mui/material'

function Prepaid({icon}) {
  return (
    <>
        <Box className="container">
            <Box className="sub_container">
                <Box className="card">
                    <Typography className="heading">Buy pre-paid cheques</Typography>
                    <Box className="btn_container">
                        <Button className='btn'>Enter Amount</Button>
                    </Box>
                </Box>
            </Box>

            <Box className="sub_container">
                <Box className="card">
                    <Typography className="heading">Pre-paid for hold product</Typography>
                    <Box className="btn_container">
                        <Button className='btn'>Enter Amount</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box component="img" src={icon} alt="prepaid" className='icon'/>
    </>
  )
}

export default Prepaid