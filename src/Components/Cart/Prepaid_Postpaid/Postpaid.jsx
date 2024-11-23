import React from 'react'
import { Box, Button, Typography } from '@mui/material'

function Postpaid({icon}) {
  return (
    <>
        <Box className="container">
            <Box className="sub_container">
                <Box className="card">
                    <Typography className="heading">Credit & Mou</Typography>
                    <Box className="btn_group">
                        <Box className="btn_container">
                            <Button className='btn'>Show Amount</Button>
                        </Box>
                        <Box className="btn_container">
                            <Button className='btn'>Enter to pay</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="sub_container">
                <Box className="card">
                    <Typography className="heading">Balance & Paid</Typography>
                    <Box className="btn_group">
                        <Box className="btn_container">
                            <Button className='btn'>Show Amount</Button>
                        </Box>
                        <Box className="btn_container">
                            <Button className='btn'>Enter to pay</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box component="img" src={icon} alt="prepaid" className='icon'/>
    </>
  )
}

export default Postpaid